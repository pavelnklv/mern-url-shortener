import React from 'react'

export default function UrlCard({ url }) {
  return (
    <article className="uk-margin-top uk-card uk-card-default">
      <section className="uk-card-header">
        <p>{url.name}</p>
        <a
          href={url.long}
          target="_blank"
          rel="noreferrer"
        >
          {url.long}
        </a>
      </section>
      <section className="uk-card-header ">
        <a
          href={`${window.location.origin}/${url.short}`}
          target="_blank"
          rel="noreferrer"
        >
          {`${window.location.origin}/${url.short}`}
        </a>
      </section>
    </article>
  )
}
