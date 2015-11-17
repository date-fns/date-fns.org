import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from 'app/config/webpack'
import appConfig from 'app/config/app'
import ejs from 'ejs'
import fs from 'fs'
import path from 'path'

const DEFAULT_PORT = 5000
const server = express()
const webpackCompiler = webpack(webpackConfig)

server
  .use(webpackDevMiddleware(webpackCompiler))
  .use(webpackHotMiddleware(webpackCompiler))
  .use(express.static(appConfig.staticPath))
  .get('*', (req, res) => {
    fs.readFile(path.join(__dirname, 'template.ejs'), (err, templateStream) => {
      const template = ejs.compile(templateStream.toString())
      const html = template({
        staticPath(staticName) {
          return staticName
        },

        entryPath(entryName, type = 'js') {
          return `/${type}/${entryName}.${type}`
        }
      })
      res.send(html)
    })
  })
  .listen(process.env.APP_PORT || DEFAULT_PORT)
