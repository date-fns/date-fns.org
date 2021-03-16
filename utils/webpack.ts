import * as path from 'path'
import { DefinePlugin, Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function getPath(filename: string) {
  return path.resolve(process.cwd(), filename)
}

export function getMode() {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development'
}

export function getConfig({
  plugins = [],
  ...rest
}: Configuration): Configuration {
  const { target } = rest
  const mode = getMode()

  const tsLoaders = [
    {
      loader: 'ts-loader',
      options: {
        context: process.cwd(),
        configFile: getPath('tsconfig.json'),
      },
    },
  ]

  const cssLoaders =
    target === 'web'
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

  const fileLoaders = [
    { loader: 'file-loader', options: { emitFile: target === 'web' } },
  ]

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
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        '~': getPath('src'),
      },
    },
    plugins: [
      ...plugins,
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
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
    ...rest,
  }
}
