#!/bin/bash

# The deployment script

set -ex

if [ -z "${APP_ENV+x}" ];
then
  echo 'APP_ENV is unset; please set to staging or production'
  exit 1
fi

case $APP_ENV in
  'production')
    FIREBASE_PROJECT_NAME="date-fns";;
  'staging')
    FIREBASE_PROJECT_NAME="date-fns-org-staging";;
  *)
    echo "Unknown APP_ENV value: \"$APP_ENV\"; please set to staging or production"
    exit 1;;
esac

PATH="$(yarn bin):$PATH"
export PATH

yarn build
cd dist
firebase deploy --project "$FIREBASE_PROJECT_NAME" --token "$FIREBASE_TOKEN" --non-interactive
