import { getPath, getConfig } from './utils/webpack'
import nodeExternals from 'webpack-node-externals'
import { Configuration } from 'webpack'

const config: Configuration = getConfig({
  entry: getPath('src/functions/index.ts'),
  output: {
    filename: 'index.js',
    path: getPath('build/functions'),
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
})

export default config
