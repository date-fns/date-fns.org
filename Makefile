start:
	env NODE_ENV=development node_modules/.bin/babel-node app/env/dev

test-lint:
	node_modules/.bin/standard --verbose | node_modules/.bin/snazzy

test-unit:
	env NODE_ENV=test node_modules/.bin/babel-node node_modules/.bin/karma start config/karma.js --single-run

test-unit-watch:
	env NODE_ENV=test node_modules/.bin/babel-node node_modules/.bin/karma start config/karma.js

test-system:
	sh scripts/test_system.sh

test-ci: test-lint test-unit test-system
