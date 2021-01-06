const { getPath, getConfig } = require('./utils/webpack')

module.exports = getConfig({
  tsConfig: getPath('config/tsconfig.client.json'),
  entry: getPath('src/client/index.tsx'),
  output: {
    filename: 'script.js',
    path: getPath('dist/static'),
    publicPath: '/static/'
  },
  target: 'web'
})
