# graph_engine.py

import os
import requests

"""
graph_engine.py provides a Python interface to interact with a
GraphDB repository via SPARQL queries and updates in the context of EXE project.
"""

# Optional: read these from environment or from a config file
GDB_HOST = os.environ.get("GDB_HOST", "localhost")
GDB_PORT = os.environ.get("GDB_PORT", "7200")
GDB_REPO = os.environ.get("GDB_REPO", "EXE-Repo")  # name/ID of your repository
GDB_USER = os.environ.get("GDB_ADMIN_USER", "")
GDB_PASS = os.environ.get("GDB_ADMIN_PASSWORD", "")

# Base URL for queries and updates
# For queries, we'll do GET to /repositories/EXE-Repo
# For updates, we'll do POST to /repositories/EXE-Repo/statements
BASE_URL = f"http://{GDB_HOST}:{GDB_PORT}/repositories/{GDB_REPO}"
UPDATE_URL = f"{BASE_URL}/statements"


def run_select_query(sparql_query: str, pretty_print: bool = True):
    """
    Executes a SPARQL SELECT query and returns results in JSON format.
    If pretty_print is True, prints the results. Otherwise, returns them as Python objects.
    """
    params = {"query": sparql_query}
    headers = {
        "Accept": "application/sparql-results+json"
    }

    auth = (GDB_USER, GDB_PASS) if GDB_USER else None

    response = requests.get(BASE_URL, params=params, headers=headers, auth=auth)
    if response.status_code == 200:
        data = response.json()
        if pretty_print:
            print_results(data)
            return data
        else:
            return data
    else:
        print(f"Query error [HTTP {response.status_code}]: {response.text}")
        return None


def insert_data(sparql_update: str):
    """
    Executes a SPARQL UPDATE (INSERT/DELETE) operation.
    """
    headers = {
        "Content-Type": "application/sparql-update"
    }

    auth = (GDB_USER, GDB_PASS) if GDB_USER else None

    response = requests.post(UPDATE_URL, data=sparql_update, headers=headers, auth=auth)
    if response.status_code == 200:
        print("SPARQL update successful.")
    else:
        print(f"Update error [HTTP {response.status_code}]: {response.text}")


def upload_rdf_file(file_path: str, graph_uri: str = None):
    """
    Uploads an RDF file into the repository. 
    graph_uri can be specified for a named graph, or left None for the default graph.
    """
    files = {
        "file": (os.path.basename(file_path), open(file_path, "rb"), "application/octet-stream")
    }
    data = {"context": graph_uri if graph_uri else ""}
    auth = (GDB_USER, GDB_PASS) if GDB_USER else None

    response = requests.post(
        f"http://{GDB_HOST}:{GDB_PORT}/rest/data/import/upload/{GDB_REPO}",
        files=files,
        data=data,
        auth=auth
    )
    if response.status_code == 200:
        print(f"File '{file_path}' uploaded successfully.")
    else:
        print(f"File upload error [HTTP {response.status_code}]: {response.text}")


def print_results(json_data):
    """
    Helper function to print SPARQL SELECT results in a readable form.
    """
    if "results" not in json_data:
        print("No 'results' key found in response.")
        return

    bindings = json_data["results"].get("bindings", [])
    if not bindings:
        print("No results found.")
        return

    # Print variable names as table header
    var_names = json_data["head"].get("vars", [])
    print("\t".join(var_names))

    # Print each solution row
    for row in bindings:
        row_values = []
        for var in var_names:
            val = row[var]["value"] if var in row else "N/A"
            row_values.append(val)
        print("\t".join(row_values))


if __name__ == "__main__":
    # Example usage:
    print("Running a test SELECT query on the repository...")

    test_query = """
    PREFIX exe: <https://exe.ai#>
    SELECT ?class
    WHERE {
      ?class a owl:Class.
      FILTER(STRSTARTS(STR(?class), "https://exe.ai#"))
    }
    LIMIT 10
    """
    run_select_query(test_query)
