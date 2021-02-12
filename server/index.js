import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import session from 'cookie-session'

import authRouter from './routers/auth'
import urlsRouter from './routers/urls'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const server = express()

server.use(session({
  name: 'sess',
  secret: process.env.SECRET,
  secure: true, // process.env.NODE_ENV === 'production',
  httpOnly: true,
  maxAge: 604800000,
}))
server.use(express.static(`${__dirname}/public`))

server.get('/login', async (req, res) => res.sendFile(`${__dirname}/public/index.html`))
server.get('/register', async (req, res) => res.sendFile(`${__dirname}/public/index.html`))

server.use(authRouter)
server.use(urlsRouter)
server.get('*', async (req, res) => res.sendFile(`${__dirname}/public/index.html`))

server.listen(process.env.PORT)
