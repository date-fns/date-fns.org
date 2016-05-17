import webpackConfig from './webpack'
import path from 'path'

export default function (config) {
  config.set({
    frameworks: ['mocha', 'sinon', 'es5-shim'],
    files: [path.join(process.cwd(), 'test', 'unit.js')],
    preprocessors: {
      [path.join(process.cwd(), 'test', 'unit.js')]: ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        assets: false,
        chunks: false,
        hash: false,
        timings: false,
        version: false
      }
    },

    plugins: [
      'karma-es5-shim',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sinon',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    browsers: ['PhantomJS'],
    reporters: ['mocha']
  })
}
