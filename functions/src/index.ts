import * as functions from 'firebase-functions'
import fetch from 'node-fetch'

const year = 31556952000
const defaultType = 'application/json; charset=utf-8'

export const cache = functions.https.onRequest(async (req, resp) => {
  const url = req.query.url as string | undefined
  if (!url) {
    resp.status(400).send('Bad request')
    return
  }

  const age = req.query.age as string | undefined
  const urlResp = await fetch(url)
  const urlBody = await urlResp.text()
  resp
    .header('cache-control', `public, max-age=${age || year}`)
    .header('content-type', urlResp.headers.get('content-type') || defaultType)
    .send(urlBody)
})
