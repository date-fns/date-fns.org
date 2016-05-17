import 'babel-polyfill'

const testsContext = require.context('../app', true, /\/test\.jsx?$/)
testsContext.keys().forEach(testsContext)
