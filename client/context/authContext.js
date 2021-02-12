import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({
  loading: true,
  me: null,
  updateMe: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [me, setMe] = useState(null)

  const updateMe = async () => {
    const res = await fetch('/me', { credentials: 'include' })
    if (res.ok) {
      const json = await res.json()
      setMe(json)
    } else {
      setMe(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    updateMe()
  }, [])

  return (
    <AuthContext.Provider value={{ loading, me, updateMe }}>
      {children}
    </AuthContext.Provider>
  )
}
