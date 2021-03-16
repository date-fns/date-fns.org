import express from 'express'
import { requestGraphQL } from '~/utils/request'
import { sponsorsQuery } from './sponsorsQuery'
import { OPEN_COLLECTIVE_API_KEY } from '~/constants'
import cors from 'cors'

const SPONSORS_URL = 'https://api.opencollective.com/graphql/v2'
const ONE_DAY = 24 * 60 * 60

export const sponsors = express()

sponsors.get('/api/sponsors', cors(), async (req, res) => {
  const { age } = req.query
  const json = await requestGraphQL(SPONSORS_URL, sponsorsQuery, {
    'Api-Key': OPEN_COLLECTIVE_API_KEY,
  })
  res.header('cache-control', `public, max-age=${age ?? ONE_DAY}`).send(json)
})
