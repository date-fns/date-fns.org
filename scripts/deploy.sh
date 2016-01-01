#!/bin/sh

# Fail on non-zero exit code
set -e

echo '~ Fetching the latest date-fns'
npm install date-fns@latest

echo '~ Building the application'
npm run build

echo '~ Running Firebase deploy'
cd dist
../node_modules/.bin/firebase deploy --token "$FIREBASE_TOKEN"

echo '+ Done!'
