#!/bin/bash

if [ "$NODE_ENV" != "production" ]
then
  cp "$PWD/scripts/build/assets/robots.txt" "$PWD/build/web"
fi
