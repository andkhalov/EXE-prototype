#!/bin/bash
set -e

# 1. Start GraphDB in background
/__cacert_entrypoint.sh &

# 2. Wait and run the setup script
/setup-graphdb.sh

# 3. Bring GraphDB to foreground so the container keeps running
fg %1