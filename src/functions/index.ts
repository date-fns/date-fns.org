import 'isomorphic-fetch'
import { https } from 'firebase-functions'
import express from 'express'
import { api } from '~/server/api'
import { ssr } from '~/server/ssr'

const server = express()
server.use(api)
server.use(ssr)

export const app = https.onRequest(server)
