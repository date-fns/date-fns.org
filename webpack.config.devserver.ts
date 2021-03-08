import { getPath, getConfig } from './utils/webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration, HotModuleReplacementPlugin } from 'webpack'

const config: Configuration = getConfig({
  entry: getPath('src/client/index.tsx'),
  output: {
    filename: 'script.js',
    path: getPath('dist/static'),
    publicPath: '/',
  },
  target: 'web',

  devServer: {
    port: 1337,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false,
    },
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: getPath('src/static'), to: 'static' }],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: getPath('src/assets/template.ejs'),
    }),
    new HotModuleReplacementPlugin(),
  ],
})

export default config
