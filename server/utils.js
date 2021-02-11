import fetch from 'node-fetch'
import cheerio from 'cheerio'

export const getLongUrlTitle = async longUrl => {
  const res = await fetch(longUrl)
  const body = await res.text()
  const $ = cheerio.load(body)
  return $('title').text()
}

export const generateShortUrl = () => Math.random().toString(36).slice(-7)
