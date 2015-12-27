#!/bin/bash

npm install date-fns@latest
npm run build
cd dist
../node_modules/.bin/firebase deploy --token "${FIREBASE_TOKEN}"
