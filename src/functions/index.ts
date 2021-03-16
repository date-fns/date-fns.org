import { https } from 'firebase-functions'
import express from 'express'
import { sponsors } from '~/server/sponsors'
import { ssr } from '~/server/ssr'

const server = express()
server.use(sponsors)
server.use(ssr)

export const app = https.onRequest(server)
