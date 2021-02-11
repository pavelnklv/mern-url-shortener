import React from 'react'
import ShortenForm from '../components/ShortenForm'
import UrlCard from '../components/UrlCard'
import useLocalStorageUrls from '../hooks/useLocalStorageUrls'

export default function Home() {
  const { loading, urls, addUrl} = useLocalStorageUrls()
  return (
    <div className="uk-width-1-1">
      <ShortenForm onAddUrl={addUrl} />
      {loading ?
          <p>loading</p>
        :
          urls.map(url => (
            <UrlCard url={url} key={url._id} />
          ))
      }
    </div>
  )
}
