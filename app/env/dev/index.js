import webpack from 'webpack'
import Koa from 'koa'
import koaWebpack from 'koa-webpack'
import koaStatic from 'koa-static'
import koaMount from 'koa-mount'
import webpackConfig from '../../../config/webpack'
import appConfig from '../../../config/app'
import ejs from 'ejs'
import fsp from 'fs-promise'
import path from 'path'

const app = new Koa()
const webpackCompiler = webpack(webpackConfig)
const port = process.env.SYSTEM_TESTS ? 5001 : process.env.APP_PORT || 5000

app
  .use(koaMount('/assets', koaStatic(appConfig.staticPath)))
  .use(koaWebpack({ compiler: webpackCompiler }))
  .use(async ctx => {
    const templateContent = await fsp.readFile(
      path.join(__dirname, 'template.ejs')
    )
    const template = ejs.compile(templateContent.toString())

    ctx.body = template({
      staticPath: staticName => `/assets${staticName}`,
      entryPath: (entryName, type = 'js') =>
        `/assets/${type}/${entryName}.${type}`,
      env: process.env.NODE_ENV
    })
  })

const server = app.listen(port, '0.0.0.0')

console.log(`Listening at http://localhost:${port}`)

if (process.env.SYSTEM_TESTS) {
  process.title = 'INTEGRATION_TESTS_SERVER'
  process.on('SIGQUIT', () => {
    server.close()
    process.exit(0)
  })
}
