#!/bin/bash
set -e

echo "Starting GraphDB with parameters: $@"

# Start GraphDB directly, passing in CMD parameters and adding security options.
# The security options enable authentication and set the admin username and password.
# (Ensure that GDB_ADMIN_USER and GDB_ADMIN_PASSWORD are set in your environment.)
/opt/graphdb/dist/bin/graphdb -Dgraphdb.security.enabled=true -Dgraphdb.admin.user="${GDB_ADMIN_USER}" -Dgraphdb.admin.password="${GDB_ADMIN_PASSWORD}" "$@" &
graphdb_pid=$!

echo "Waiting for GraphDB to become available on port 7200..."

# Loop until GraphDB responds on port 7200. As soon as it does, exit the loop.
until curl --output /dev/null --silent --head --fail "http://localhost:7200"; do
  echo "GraphDB is unavailable - sleeping"
  sleep 5
done

echo "GraphDB is up and running; proceeding with setup..."

# Run the setup script
/setup-graphdb.sh

# Wait for the GraphDB process to finish so the container doesn't exit.
wait $graphdb_pid