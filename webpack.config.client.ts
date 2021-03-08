import { getPath, getConfig } from './utils/webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { Configuration } from 'webpack'

const config: Configuration = getConfig({
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

export default config
