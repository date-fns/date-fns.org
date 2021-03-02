const path = require('path')
const { DefinePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function getPath(filename) {
  return path.resolve(process.cwd(), filename)
}

function getConfig({ rules = [], plugins = [], ...rest }) {
  const mode =
    process.env.NODE_ENV === 'production' ? 'production' : 'development'

  const tsLoaders = [
    {
      loader: 'ts-loader',
      options: {
        context: process.cwd(),
        configFile: getPath('tsconfig.json'),
      },
    },
  ]

  const cssLoaders = [
    { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
    'css-loader',
  ]

  const nyancssLoaders = [
    '@nyancss/css-modules-loader/preact',
    { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
    {
      loader: 'css-loader',
      options: { modules: true },
    },
  ]

  const fileLoaders = [
    {
      loader: 'file-loader',
      options: rest.devServer
        ? {
            name: 'static/[name].[ext]',
          }
        : {},
    },
  ]

  const rawLoaders = ['raw-loader']

  return {
    mode,
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: tsLoaders,
          exclude: /node_modules/,
        },

        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /global/, // foobar.css?global
              use: cssLoaders,
            },
            { use: nyancssLoaders },
          ],
        },

        {
          test: /\.(png|jpg|gif|svg)$/,
          use: fileLoaders,
        },

        {
          test: /\.(graphql)$/,
          use: rawLoaders,
        },
        ...rules,
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        '~': getPath('src'),
      },
    },
    plugins: [
      new MiniCssExtractPlugin(
        mode === 'production'
          ? {
              filename: '[name]-[hash].css',
              chunkFilename: '[id]-[hash].css',
            }
          : {
              filename: '[name].css',
              chunkFilename: '[id].css',
            }
      ),
      ...plugins,
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
    ...rest,
  }
}

module.exports = {
  getPath,
  getConfig,
}
