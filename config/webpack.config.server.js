const { getPath, getConfig } = require('./utils/webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = getConfig({
  tsConfig: getPath('config/tsconfig.server.json'),
  entry: getPath('src/server/index.tsx'),
  output: {
    filename: 'index.js',
    path: getPath('build'),
    // Expose module.exports from entry for firebase to run
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  // Do not bundle all external libraries
  externals: [nodeExternals()],

  rules: [
    // Load ejs file as a template function
    {
      test: /\.ejs?$/,
      use: [{ loader: 'ejs-webpack-loader' }]
    }
  ]
})
