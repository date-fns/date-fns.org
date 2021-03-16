import express from 'express'
import { sponsors } from '~/server/sponsors'
import { template } from '~/server/template'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from './webpack.config.devserver'

const PORT = 1337

const compiler = webpack(config)

const server = express()
server.use(sponsors)
server.use(WebpackDevMiddleware(compiler))
server.use(WebpackHotMiddleware(compiler))

server.get('*', (_req, res) => {
  res.send(
    template({
      entry: '/static/script.js',
      styles: '/static/main.css',
    })
  )
})

server.listen(1337)
console.log(`Started listening on http://localhost:${PORT}/`)
