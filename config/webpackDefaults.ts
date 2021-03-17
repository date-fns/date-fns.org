import { DefinePlugin, Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { getMode, getPath } from './utils'
import merge from 'webpack-merge'

export function webpackDefaults(config: Configuration): Configuration {
  const mode = getMode()
  const isProduction = mode === 'production'
  const isWeb = config.target === 'web'

  return merge(
    {
      mode,
      devtool: isProduction ? 'source-map' : 'inline-source-map',
      module: {
        rules: [tsRule(), cssRule(isWeb), fileRule(isWeb)],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          '~': getPath('src'),
        },
      },
      plugins: [
        new MiniCssExtractPlugin(
          isProduction
            ? {
                filename: '[name]-[fullhash].css',
                chunkFilename: '[id]-[fullhash].css',
              }
            : {
                filename: '[name].css',
                chunkFilename: '[id].css',
              }
        ),
        new DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
      ],
    },
    config
  )
}

function tsRule() {
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          context: process.cwd(),
          configFile: getPath('tsconfig.json'),
        },
      },
    ],
    exclude: /node_modules/,
  }
}

function cssRule(isWeb: boolean) {
  const cssLoaders = isWeb
    ? [
        { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
        'css-loader',
      ]
    : 'null-loader'

  const nyancssLoaders = [
    '@nyancss/css-modules-loader/preact',
    { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
    {
      loader: 'css-loader',
      options: { modules: true },
    },
  ]

  return {
    test: /\.css$/,
    oneOf: [
      {
        resourceQuery: /global/, // foobar.css?global
        use: cssLoaders,
      },
      { use: nyancssLoaders },
    ],
  }
}

export function fileRule(isWeb: boolean) {
  return {
    test: /\.(png|jpg|gif|svg)$/,
    use: [{ loader: 'file-loader', options: { emitFile: isWeb } }],
  }
}
