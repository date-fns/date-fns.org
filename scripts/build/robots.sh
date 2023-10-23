#!/bin/bash

if [[ "$APP_ENV" == "staging" ]]; then
  cp "$PWD/scripts/build/assets/robots.staging.txt" "$PWD/build/web/robots.txt"
else
  cp "$PWD/scripts/build/assets/robots.production.txt" "$PWD/build/web/robots.txt"
fi