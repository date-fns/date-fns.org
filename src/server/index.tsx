import 'isomorphic-fetch'
import { https } from 'firebase-functions'
import { h, FunctionComponent } from 'preact'
import render from 'preact-render-to-string'
// import { UI } from '~/ui'
import template from '~/assets/template.ejs'
// import { RouterContext, useRouter } from '~/ui/router'
import express from 'express'
import { requestGraphQL, getJSON } from '~/utils/request'
import sponsorsQuery from './sponsorsQuery.graphql'
import { OPEN_COLLECTIVE_API_KEY } from '~/constants'
import cors from 'cors'
import { cache } from './cache'

const SPONSORS_URL = 'https://api.opencollective.com/graphql/v2'
const CONTRIBUTORS_URL =
  'https://api.github.com/repos/date-fns/date-fns/contributors?per_page=999'

export const server = express()

const ServerUI: FunctionComponent<{ url: string }> = () => {
  // const router = useRouter(url)

  // return (
  //   <RouterContext.Provider value={router}>
  //     <UI />
  //   </RouterContext.Provider>
  // )
  return (
    <div>
      SSR would be coming soon but I need to research what to do with
      style-loader
    </div>
  )
}

server.get('/api/sponsors', cors(), async (_req, res) => {
  const json = await cache('sponsors', () =>
    requestGraphQL(SPONSORS_URL, sponsorsQuery, {
      'Api-Key': OPEN_COLLECTIVE_API_KEY,
    })
  )
  res.send(json)
})

server.get('/api/contributors', cors(), async (_req, res) => {
  const json = await cache('contributors', () => getJSON(CONTRIBUTORS_URL))
  res.send(json)
})

server.get('*', (req, res) => {
  const body = render(<ServerUI url={req.url} />)

  res.send(
    template({
      body,
      entry: '/static/script.js',
      env: process.env.NODE_ENV,
    })
  )
})

export const app = https.onRequest(server)
