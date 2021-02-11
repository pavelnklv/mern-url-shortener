import { useEffect, useState } from 'react'

export default function useLocalStorageUrls() {
  const [loading, setLoading] = useState(true)
  const [urls, setUrls] = useState([])

  const addUrl = async long => {
    const res = await fetch('/urls', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ long })
    })
    const json = await res.json()
    const newUrls = [json, ...urls]
    console.log(newUrls)
    localStorage.setItem('urls', JSON.stringify(newUrls))
    setUrls(newUrls)
  }

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('urls')) || []
    setUrls(urls)
    setLoading(false)
  }, [])

  return { loading, urls, addUrl }
}
