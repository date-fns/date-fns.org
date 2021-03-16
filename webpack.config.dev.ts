import { Configuration, HotModuleReplacementPlugin } from 'webpack'
import { getPath, getConfig } from './utils/webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const config: Configuration = getConfig({
  entry: getPath('src/web/index.tsx'),
  output: {
    path: getPath('build/web/static'),
    publicPath: '/static/',
  },
  target: 'web',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: getPath('src/static') }],
    }),
    new HotModuleReplacementPlugin(),
  ],
})

export default config
