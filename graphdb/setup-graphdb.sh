#!/bin/bash
set -e

echo "Starting GraphDB with parameters: $@"

# Start GraphDB with security enabled and pass admin credentials
/opt/graphdb/dist/bin/graphdb -Dgraphdb.security.enabled=true \
  -Dgraphdb.admin.user="${GDB_ADMIN_USER}" \
  -Dgraphdb.admin.password="${GDB_ADMIN_PASSWORD}" "$@" &
graphdb_pid=$!

echo "Waiting for GraphDB to become available on port 7200..."

# Loop until GraphDB responds on port 7200 using the provided credentials
until curl --output /dev/null --silent --head --fail -u "${GDB_ADMIN_USER}:${GDB_ADMIN_PASSWORD}" "http://localhost:7200"; do
  echo "GraphDB is unavailable - sleeping"
  sleep 5
done

echo "GraphDB is up and running; proceeding with setup..."

/setup-graphdb.sh

# Wait for the GraphDB process to finish so the container doesn't exit.
wait $graphdb_pid
