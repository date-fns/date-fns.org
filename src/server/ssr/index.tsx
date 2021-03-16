import express from 'express'
import { h, FunctionComponent } from 'preact'
import render from 'preact-render-to-string'
import { UI } from '~/ui'
import { RouterContext, useRouter } from '~/ui/router'
import { template } from '~/server/template'

export const ssr = express()

const ServerUI: FunctionComponent<{ url: string }> = ({ url }) => {
  const router = useRouter(url)

  return (
    <RouterContext.Provider value={router}>
      <UI />
    </RouterContext.Provider>
  )
}

ssr.get('*', (req, res) => {
  const url = req.protocol + '://' + req.get('host') + req.url
  const body = render(<ServerUI url={url} />)

  res.send(
    template({
      body,
    })
  )
})
