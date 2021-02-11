import React, { useState } from 'react'

export default function ShortenForm({ onAddUrl }) {
  const [long, setLong] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (!long) return
    onAddUrl(long)
    setLong('')
  }

  return (
    <article className="uk-padding uk-background-muted">
      <form className="uk-flex" onSubmit={onSubmit}>
          <input
            type="text"
            name="longUrl"
            placeholder="Enter long url and shorten it"
            className="uk-input"
            value={long}
            onChange={e => setLong(e.target.value)}
          />
          <button type="submit" className="uk-button uk-button-primary">Shorten</button>
      </form>
    </article>
  )
}
