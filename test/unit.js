/*global require*/

import 'babel-polyfill'
import 'whatwg-fetch'

const testsContext = require.context('../app', true, /\/test\.jsx?$/)
testsContext.keys().forEach(testsContext)
