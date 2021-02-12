import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

export default function Navbar() {
  const history = useHistory()
  const { me, updateMe } = useContext(AuthContext)

  const onLogoutClick = async () => {
    await fetch('/logout', { method: 'POST', credentials: 'include' })
    updateMe()
    history.push('/')
  }
  return (
    <nav className="uk-navbar-container">
      <div className="uk-container uk-flex">
        <section className="uk-navbar-left">
          <Link to="/" className="uk-navbar-item uk-logo">shortis.tk</Link>
        </section>
        <section className="uk-navbar-right">
          {me ? (
            <button
              className="uk-button uk-button-danger"
              onClick={onLogoutClick}
            >
              Log out
            </button>
          ) : (
            <ul className="uk-navbar-nav">
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/register" className="uk-text-success">Sign up</Link>
              </li>
            </ul>
          )}
        </section>
      </div>
    </nav>
  )
}
