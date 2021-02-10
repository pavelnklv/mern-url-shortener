import express from 'express'

const server = express()

server.use(express.static(`${__dirname}/public`))

server.get('*', async (req, res) => res.sendFile(`${__dirname}/public/index.html`))

server.listen(3000)
