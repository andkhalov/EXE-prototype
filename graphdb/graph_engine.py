#!/usr/bin/env python3
import os
import sys
import time
import requests

# Параметры подключения (можно задать через переменные окружения)
GDB_ADMIN_USER = os.environ.get("GDB_ADMIN_USER", "")
GDB_ADMIN_PASSWORD = os.environ.get("GDB_ADMIN_PASSWORD", "")

BASE_URL = "http://localhost:7200"
REPO_NAME = "EXE-Repo"

def repository_exists():
    """checking if repository exist"""
    url = f"{BASE_URL}/rest/repositories"
    try:
        response = requests.get(url, auth=(GDB_ADMIN_USER, GDB_ADMIN_PASSWORD))
        response.raise_for_status()
    except Exception as e:
        print(f"Repo checking error {e}")
        sys.exit(1)
    # Ответ – XML; если имя репозитория встречается в тексте, считаем, что репозиторий существует.
    if REPO_NAME in response.text:
        return True
    return False

def create_repository():
    """Create repo woth config file"""
    print(f"Repository {REPO_NAME} not found. Creating repository...")
    url = f"{BASE_URL}/rest/repositories"
    try:
        with open("repo-config.ttl", "rb") as f:
            files = { 'config': ('repo-config.ttl', f, "text/plain") }
            response = requests.post(url, files=files, auth=(GDB_ADMIN_USER, GDB_ADMIN_PASSWORD))
            response.raise_for_status()
    except Exception as e:
        print(f"Repository creation error: {e}")
        sys.exit(1)
    print(f"Repository {REPO_NAME} created successfull.")

def ontology_loaded():
    """Checking ontology."""
    sparql_endpoint = f"{BASE_URL}/repositories/{REPO_NAME}"
    query = "ASK WHERE { ?s ?p ?o }"
    params = {"query": query}
    try:
        response = requests.get(sparql_endpoint, params=params, auth=(GDB_ADMIN_USER, GDB_ADMIN_PASSWORD))
        response.raise_for_status()
        # If True ontology on place
        if "true" in response.text.lower():
            return True
    except Exception as e:
        print(f"Error ontology checking: {e}")
    return False

def load_ontology():
    """Downloading ontology file into repository."""
    print("Ontology not found, downloading ontology...")
    url = f"{BASE_URL}/rest/data/import/upload/{REPO_NAME}"
    try:
        # Checking owl file
        with open(os.path.join("ontology", "exe.owl"), "rb") as f:
            files = { 'file': ('exe.owl', f, "application/octet-stream") }
            response = requests.post(url, files=files, auth=(GDB_ADMIN_USER, GDB_ADMIN_PASSWORD))
            response.raise_for_status()
    except Exception as e:
        print(f"Error ontology downloading: {e}")
        sys.exit(1)
    print("Ontology loading complete.")

def main():
    print("Checking repository...")
    if not repository_exists():
        create_repository()
        time.sleep(5)
    else:
        print(f"Repository {REPO_NAME} alreay exists.")

    print("Checking ontology donloading (Abox and Tbox)...")
    if not ontology_loaded():
        load_ontology()
    else:
        print("Ontology already downloaded.")

    print("All checks passes, Abox and Tbox created (or already exist).")

if __name__ == "__main__":
    main()
