import path from 'path'
import webpack from 'webpack'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import StaticFilesWebpackPlugin from 'static-files-webpack-plugin'
import appConfig from './app'
import CTagsWebpackPlugin from 'ctags-webpack-plugin'

const appEnv = process.env.APP_ENV || 'development'
const nodeEnv = process.env.NODE_ENV || 'development'

const isDevelopment = nodeEnv === 'development'
const isProduction = nodeEnv === 'production'
const isSystemTests = process.env.SYSTEM_TESTS
const enableDebuggingTools = isDevelopment && !isSystemTests

const plugins = [
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify(appEnv),
    'process.env.NODE_ENV': JSON.stringify(nodeEnv)
  })
]

if (enableDebuggingTools) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new CTagsWebpackPlugin('tags'))
}

if (isProduction) {
  plugins.push(
    new AssetsWebpackPlugin({
      path: appConfig.distPath
    })
  )
  plugins.push(
    new StaticFilesWebpackPlugin({
      outputPath: path.join(appConfig.distPath, 'static.json')
    })
  )
}

export default {
  cache: true,
  devtool: isProduction ? 'source-map' : 'inline-source-map',

  entry: {
    app: []
      .concat(enableDebuggingTools ? ['webpack-hot-middleware/client'] : [])
      .concat('app/env/web')
  },

  output: {
    path: path.join(appConfig.distPath, 'assets'),
    publicPath: '/assets/',
    filename: isProduction ? 'js/[name]-[hash].js' : 'js/[name].js',
    chunkFilename: isProduction ? 'js/[id]-[chunkhash].js' : 'js/[id].js'
  },

  plugins,

  resolve: {
    modulesDirectories: ['.', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: (enableDebuggingTools
          ? ['ctags-webpack-plugin/loader', 'react-hot']
          : []).concat(['babel']),
        exclude: path.join(process.cwd(), 'node_modules')
      },
      {
        test: /\.js$/,
        loaders: (enableDebuggingTools
          ? ['ctags-webpack-plugin/loader']
          : []).concat(['babel']),
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
      }
    ],

    preLoaders: [
      {
        test: /index\.jsx$/,
        loaders: ['baggage?style.css'],
        exclude: path.join(process.cwd(), 'node_modules')
      }
    ]
  },

  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
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
