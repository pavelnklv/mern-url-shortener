import React, { useContext, useRef } from 'react'
import { AuthContext } from '../context/authContext'

export default function UrlCard({ url, deleteUrl }) {
  const { me } = useContext(AuthContext)
  const shortUrlRef = useRef(null)

  const onCopyClick = async () => {
    const shortUrl = shortUrlRef.current.innerText
    await window.navigator.clipboard.writeText(shortUrl)
  }

  const onDeleteClick = async (_id) => {
    await fetch(`/${_id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    deleteUrl(_id)
  }

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
      <section className="uk-card-footer uk-flex-inline">
        <a
          href={`${window.location.origin}/${url.short}`}
          target="_blank"
          rel="noreferrer"
          ref={shortUrlRef}
        >
          {`${window.location.origin}/${url.short}`}
        </a>
        <section className="uk-flex uk-flex-stretch uk-margin-left">
          <i
            className="material-icons"
            title="Copy"
            onClick={onCopyClick}
          >
            content_copy
          </i>
          {me && (
            <>
              <i
                className="material-icons"
                title="Delete"

                onClick={() => onDeleteClick(url._id)}
              >
                delete_forever
              </i>
            </>
          )}
        </section>
      </section>
    </article>
  )
}
