import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export default function Login() {
  const history = useHistory()
  const { updateMe } = useContext(AuthContext)
  const [userValues, setUserValue] = useState({
    email: '', password: ''
  })

  const onChange = e =>
    setUserValue({ ...userValues, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()

    const res = await fetch('/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userValues)
    })
    if (res.ok) {
      updateMe()
      history.push('/')
    }
  }

  return (
    <div className="uk-width-1-1">
      <h2 className="uk-text-center uk-margin-top">Log in</h2>
      <form
        className="uk-width-1-2@m uk-margin-auto"
        onSubmit={onSubmit}
      >
        <div className="uk-margin">
          <label htmlFor="email" className="uk-hidden">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="uk-input"
            value={userValues.email}
            onChange={onChange}
          />
        </div>
        <div className="uk-margin">
          <label htmlFor="password" className="uk-hidden">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            className="uk-input"
            value={userValues.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="uk-button uk-button-primary uk-width-1-1">
          Log in
        </button>
      </form>
    </div>
  )
}
