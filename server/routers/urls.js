import { Router } from 'express'
import { json } from 'body-parser'
import { generateShortUrl, getLongUrlTitle } from '../utils'
import URL from '../models/URL'

const router = Router()

router.post('/urls', json(), async (req, res) => {
  const { long } = req.body
  if (!long) return res.status(400).end()

  const name = await getLongUrlTitle(long)
  let short = generateShortUrl()

  let findUrl = await URL.findOne({ short })
  while (findUrl !== null) {
    short = generateShortUrl()
    findUrl = await URL.findOne({ short })
  }

  const newURL = new URL({ name, long, short, })
  await newURL.save()

  const url = await URL.findOne({ short }).select({ name: 1, long: 1, short: 1 })

  res.json(url)
})

router.get('/:short', async (req, res) => {
  const { short } = req.params
  const url = await URL.findOne({ short })
  if (!url) return res.status(404).end()

  console.log(JSON.stringify(req.headers))

  res.redirect(url.long)
})

export default router
