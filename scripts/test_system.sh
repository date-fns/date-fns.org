#!/bin/sh

env SYSTEM_TESTS=true npm start > tmp/server.log &

# Wait for server initialization
sleep 5

node_modules/.bin/casperjs test test/system.js
RESULT=$?

pkill -QUIT INTEGRATION_TESTS_SERVER
exit $RESULT
