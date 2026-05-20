#!/bin/sh
set -e

# Ensure data directory exists
mkdir -p /app/server/data

# Start the backend server
cd /app/server
exec node dist/index.js
