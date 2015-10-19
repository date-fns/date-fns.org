import path from 'path'
import webpack from 'webpack'

const isProduction = process.env.NODE_ENV == 'production'

export default {
  cache: true,
  devtool: isProduction ? 'source-map' : 'inline-source-map',

  entry: {
    app: [
      'webpack-hot-middleware/client',
      'app/env/web'
    ]
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
    filename: (isProduction ? 'js/[name]-[chunkhash].js' : 'js/[name].js'),
    chunkFilename: (isProduction ? 'js/[id]-[chunkhash].js' : 'js/[id].js')
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    modulesDirectories: ['.', 'node_modules'],
    extensions: ['', '.js', '.jsx']
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
