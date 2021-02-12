import React, { useState } from 'react'

export default function Register() {
  const [userValues, setNewUserValues] = useState({
    email: '', password: '', comparePassword: ''
  })

  const onChange = e =>
    setNewUserValues({ ...userValues, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    
    const res = await fetch('/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userValues)
    })
    const json = await res.json()
    console.log(json)
  }

  return (
    <div className="uk-width-1-1">
      <h2 className="uk-text-center uk-margin-top">Sign up</h2>
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

        <div className="uk-margin">
          <label htmlFor="comparePassword" className="uk-hidden">Compare password</label>
          <input
            type="password"
            name="comparePassword"
            placeholder="Compare your password"
            className="uk-input"
            value={userValues.comparePassword}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="uk-button uk-button-primary uk-width-1-1">
          Create an account
        </button>
      </form>
    </div>
  )
}
