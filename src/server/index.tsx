import 'isomorphic-fetch'
import { https } from 'firebase-functions'
import { h, FunctionComponent } from 'preact'
import render from 'preact-render-to-string'
import { UI } from '~/ui'
import template from '~/assets/template.ejs'
import { RouterContext, useRouter } from '~/ui/router'
import express from 'express'
import { requestGraphQL } from '~/utils/request'
import sponsorsQuery from './sponsorsQuery.graphql'
import { OPEN_COLLECTIVE_API_KEY } from '~/constants'
import cors from 'cors'

const SPONSORS_URL = 'https://api.opencollective.com/graphql/v2'
const ONE_DAY = 24 * 60 * 60

export const server = express()

const ServerUI: FunctionComponent<{ url: string }> = ({ url }) => {
  const router = useRouter(url)

  return (
    <RouterContext.Provider value={router}>
      <UI />
    </RouterContext.Provider>
  )
}

server.get('/api/sponsors', cors(), async (req, res) => {
  const { age } = req.query
  const json = await requestGraphQL(SPONSORS_URL, sponsorsQuery, {
    'Api-Key': OPEN_COLLECTIVE_API_KEY,
  })
  res.header('cache-control', `public, max-age=${age ?? ONE_DAY}`).send(json)
})

server.get('*', (req, res) => {
  const url = req.protocol + '://' + req.get('host') + req.url
  const body = render(<ServerUI url={url} />)

  res.send(
    template({
      body,
      entry: '/static/script.js',
      styles: '/static/main.css',
      env: process.env.NODE_ENV,
    })
  )
})

export const app = https.onRequest(server)
