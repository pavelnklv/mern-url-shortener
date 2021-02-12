import { useEffect, useState } from 'react'

export default function useUrls() {
  const [loading, setLoading] = useState(true)
  const [urls, setUrls] = useState([])

  const fetchUrls = async () => {
    const res = await fetch('/urls', { credentials: 'include' })
    if (res.ok) {
      const json = await res.json()
      setUrls(json)
    } else {
      setUrls([])
    }
    setLoading(false)
  }

  const addUrl = async long => {
    const res = await fetch('/urls', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ long })
    })
    const json = await res.json()
    const newUrls = [json, ...urls]
    setUrls(newUrls)
  }

  const deleteUrl = _id => {
    const newUrls = urls.filter(url => url._id !== _id)
    setUrls(newUrls)
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return { loading, urls, addUrl, deleteUrl }
}
