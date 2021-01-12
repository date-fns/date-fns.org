const { getPath, getConfig } = require('./utils/webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = getConfig({
  tsConfig: getPath('tsconfig.client.json'),
  entry: getPath('src/client/index.tsx'),
  output: {
    filename: 'script.js',
    path: getPath('dist/static'),
    publicPath: '/static/',
  },
  target: 'web',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: getPath('src/static') }],
    }),
  ],
})
