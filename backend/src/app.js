import express from 'express'
import cors from 'cors'

import { env } from './config/env.js'

import propertiesRoutes from './modules/properties/properties.routes.js'

export const app = express()

app.use(cors({ origin: env.CORS_ORIGIN }))
app.use(express.json({ limit: '2mb' }))

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/properties', propertiesRoutes)

