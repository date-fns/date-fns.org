SHELL := /bin/bash
NODE_BIN_PATH := $(shell yarn bin)
PATH := $(NODE_BIN_PATH):$(PATH)

start:
	env NODE_ENV=development node_modules/.bin/babel-node app/env/dev

lint:
	esw

lint-watch:
	esw --watch

lint-fix:
	esw --fix

test-unit:
	env NODE_ENV=test node_modules/.bin/babel-node node_modules/.bin/karma start config/karma.js --single-run

test-unit-watch:
	env NODE_ENV=test node_modules/.bin/babel-node node_modules/.bin/karma start config/karma.js

test-system:
	sh scripts/test_system.sh

test-ci: lint test-unit test-system
