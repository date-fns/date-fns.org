#!/bin/bash

# The deployment script

set -ex

export PATH="$(yarn bin):$PATH"

yarn build
cd dist
firebase deploy --token "$FIREBASE_TOKEN"
