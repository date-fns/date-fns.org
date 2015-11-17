import path from 'path'
import webpack from 'webpack'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import StaticFilesWebpackPlugin from 'static-files-webpack-plugin'
import appConfig from './app'

const env = process.env.NODE_ENV
const isDevelopment = env == 'development'
const isProduction = env == 'production'

const plugins = []

if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

if (isProduction) {
  plugins.push(new AssetsWebpackPlugin({
    path: appConfig.distPath
  }))
  plugins.push(new StaticFilesWebpackPlugin({
    outputPath: path.join(appConfig.distPath, 'static.json')
  }))
}

export default {
  cache: true,
  devtool: isProduction ? 'source-map' : 'inline-source-map',

  entry: {
    app: (isProduction ? [] : ['webpack-hot-middleware/client']).concat('app/env/web')
  },

  output: {
    path: appConfig.distPath,
    publicPath: '/',
    filename: (isProduction ? 'js/[name]-[hash].js' : 'js/[name].js'),
    chunkFilename: (isProduction ? 'js/[id]-[chunkhash].js' : 'js/[id].js')
  },

  plugins,

  resolve: {
    modulesDirectories: ['.', 'node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {app: process.cwd()}
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: path.join(process.cwd(), 'node_modules')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'cssnext-loader'],
        exclude: path.join(process.cwd(), 'node_modules')
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.join(process.cwd(), 'node_modules')
      },
      {
        test: /\.png/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.jpg/,
        loader: 'file'
      },
      {
        test: /\.gif/,
        loader: 'file'
      },
      {
        test: /\.svg/,
        loader: 'file'
      },
    ],

    preLoaders: [
      {
        test: /index\.jsx$/,
        loaders: ['baggage?style.css'],
        exclude: path.join(process.cwd(), 'node_modules')
      }
    ]
  },

  cssnext: {
    features: {
      customProperties: {
        variables: {
          textColor: 'black',
          backgroundColor: '#E4E4E4',
          altBackgroundColor: '#444444',
          accentColor: '#61D2DC',
          extraColor: '#41B3D3'
        }
      }
    }
  }
}
