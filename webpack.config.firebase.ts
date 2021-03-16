import { Configuration } from 'webpack'
import { getPath, getConfig, getMode } from './utils/webpack'
import nodeExternals from 'webpack-node-externals'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const mode = getMode()
const isProduction = mode === 'production'

const webConfig: Configuration = getConfig({
  entry: getPath('src/web/index.tsx'),
  output: {
    filename: isProduction ? '[name]-[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[id]-[chunkhash].js' : '[id].js',
    path: getPath('build/web/static'),
    publicPath: '/static/',
  },
  target: 'web',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: getPath('src/static') }],
    }),
    ...(isProduction
      ? [new AssetsWebpackPlugin({ path: getPath('build/functions') })]
      : []),
  ],
})

const functionsConfig: Configuration = getConfig({
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

export default [webConfig, functionsConfig]
