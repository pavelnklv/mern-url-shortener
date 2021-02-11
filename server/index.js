import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import urlsRouter from './routers/urls'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const server = express()

server.use(express.static(`${__dirname}/public`))

server.use('/login', async (req, res) => res.sendFile(`${__dirname}/public/index.html`))
server.use('/register', async (req, res) => res.sendFile(`${__dirname}/public/index.html`))

server.use(urlsRouter)
server.get('*', async (req, res) => res.sendFile(`${__dirname}/public/index.html`))

server.listen(process.env.PORT)
