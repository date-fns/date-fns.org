import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../../config/webpack'
import appConfig from '../../../config/app'
import ejs from 'ejs'
import fs from 'fs'
import path from 'path'

const DEFAULT_PORT = 5000
const app = express()
const webpackCompiler = webpack(webpackConfig)

app
  .use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath
  }))
  .use(webpackHotMiddleware(webpackCompiler))
  .use('/assets', express.static(appConfig.staticPath))
  .get('*', (req, res) => {
    fs.readFile(path.join(__dirname, 'template.ejs'), (err, templateStream) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      const template = ejs.compile(templateStream.toString())
      const html = template({
        staticPath (staticName) {
          return `/assets${staticName}`
        },

        entryPath (entryName, type = 'js') {
          return `/assets/${type}/${entryName}.${type}`
        },

        env: process.env.NODE_ENV
      })
      res.send(html)
    })
  })

const server = app.listen(
  process.env.SYSTEM_TESTS ? 5001 : process.env.APP_PORT || DEFAULT_PORT
)

if (process.env.SYSTEM_TESTS) {
  process.title = 'INTEGRATION_TESTS_SERVER'
  process.on('SIGQUIT', () => {
    server.close()
    process.exit(0)
  })
}
