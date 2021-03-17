import 'isomorphic-fetch'
import express from 'express'
import { api } from '~/server/api'
import { template } from '~/server/template'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from './webpack.config.dev'

const PORT = 1337

const compiler = webpack(config)

const server = express()
server.use(api)
server.use(WebpackDevMiddleware(compiler))
server.use(WebpackHotMiddleware(compiler))
server.get('*', (_req, res) => res.send(template()))
server.listen(PORT)

console.log(`Started listening on http://localhost:${PORT}/`)
