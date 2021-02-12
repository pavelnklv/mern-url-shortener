import { Router } from 'express'
import { json } from 'body-parser'
import { express as useragent } from 'express-useragent'
import { generateShortUrl, getLongUrlTitle } from '../utils'
import authenticate from '../middlewares/authenticate'
import URL from '../models/URL'

const router = Router()

router.post('/urls', json(), authenticate, async (req, res) => {
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
  if (req.isAuthenticated) {
    newURL.user = req.user._id
  }
  await newURL.save()

  const url = await URL.findOne({ short })
    .select({ name: 1, long: 1, short: 1, createdAt: 1 })
    .sort('-createdAt')

  res.json(url)
})

router.get('/urls', authenticate, async (req, res) => {
  if (!req.isAuthenticated) return res.status(401).end()
  const urls = await URL.find({ user: req.user._id }).sort('-createdAt')

  res.json(urls)
})

router.get('/:short', useragent(), async (req, res) => {
  const { short } = req.params
  const { browser, os } = req.useragent
  const url = await URL.findOne({ short })
  if (!url) return res.status(404).end()

  url.clicks.push({
    browser,
    os
  })
  await url.save()

  res.redirect(url.long)
})

router.delete('/:id', authenticate, async (req, res) => {
  if (!req.isAuthenticated) return res.status(401).end()
  const { id } = req.params

  await URL.findByIdAndDelete(id)
  res.end()
})

export default router
