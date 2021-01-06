const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

function getPath(filename) {
  return path.resolve(process.cwd(), filename)
}

function getConfig({ tsConfig, rules = [], ...rest }) {
  const lintLoaders = [
    {
      loader: 'tslint-loader',
      options: {
        configFile: getPath('config/tslint.yaml'),
        typeCheck: true
      }
    }
  ]

  const tsLoaders = [
    {
      loader: 'ts-loader',
      options: {
        context: process.cwd(),
        configFile: tsConfig
      }
    }
  ]

  const cssLoaders = ['style-loader', 'css-loader']

  const nyancssLoaders = [
    'style-loader',
    '@nyancss/css-modules-loader/preact',
    {
      loader: 'css-loader',
      options: { modules: true }
    }
  ]

  const fileLoaders = [{
    loader: 'file-loader',
    options: rest.devServer ? {
      name: 'static/[name].[ext]'
    } : {
      publicPath: 'static'
    }
  }]

  const rawLoaders = ['raw-loader']

  return {
    mode: process.env.NODE_ENV || 'production',
    devtool: 'inline-source-map',
    module: {
      rules: [
        // FIXME: reenable
        // {
        //   test: /\.tsx?$/,
        //   enforce: 'pre',
        //   exclude: /node_modules/,
        //   use: lintLoaders
        // },

        {
          test: /\.tsx?$/,
          use: tsLoaders,
          exclude: /node_modules/
        },

        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /global/, // foobar.css?global
              use: cssLoaders
            },
            { use: nyancssLoaders }
          ]
        },

        {
          test: /\.(png|jpg|gif|svg)$/,
          use: fileLoaders
        },

        {
          test: /\.(graphql)$/,
          use: rawLoaders
        },
        ...rules
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: tsConfig })]
    },
    ...rest
  }
}

module.exports = {
  getPath,
  getConfig
}
