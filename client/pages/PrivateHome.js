import React from 'react'
import ShortenForm from '../components/ShortenForm'
import UrlCard from '../components/UrlCard'
import useUrls from '../hooks/useUrls'

export default function PrivateHome() {
  const { loading, urls, addUrl, deleteUrl } = useUrls()
  return (
    <div className="uk-width-1-1">
      <ShortenForm onAddUrl={addUrl} />
      {loading ?
          <p>loading</p>
        :
          urls.map(url => (
            <UrlCard url={url} key={url._id} deleteUrl={deleteUrl} />
          ))
      }
    </div>
  )
}
