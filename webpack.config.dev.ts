import { HotModuleReplacementPlugin } from 'webpack'
import { webpackDefaults } from './config/webpackDefaults'
import { getPath } from './config/utils'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const config = webpackDefaults({
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
