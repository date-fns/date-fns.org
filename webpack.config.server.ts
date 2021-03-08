import { getPath, getConfig } from './utils/webpack'
import nodeExternals from 'webpack-node-externals'
import { Configuration } from 'webpack'

const config: Configuration = getConfig({
  entry: getPath('src/server/index.tsx'),
  output: {
    filename: 'index.js',
    path: getPath('build'),
    publicPath: '/static/',
    // Expose module.exports from entry for firebase to run
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  // Do not bundle all external libraries
  externals: [
    nodeExternals({
      allowlist: [/\.css\?global$/],
    }),
  ],

  rules: [
    // Load ejs file as a template function
    {
      test: /\.ejs?$/,
      use: [{ loader: 'ejs-webpack-loader' }],
    },
  ],
})

export default config
