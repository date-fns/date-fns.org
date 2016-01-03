#!/bin/sh

env INTEGRATION_TESTS=true npm start > tmp/server.log &

# Wait for server initialization
sleep 2

npm run test-casper
RESULT=$?

pkill -QUIT INTEGRATION_TESTS_SERVER
exit $RESULT
