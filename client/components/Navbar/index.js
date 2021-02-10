import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="uk-navbar-container">
      <div className="uk-container uk-flex">
        <section className="uk-navbar-left">
          <Link to="/" className="uk-navbar-item uk-logo">ShortURL</Link>
        </section>
        <section className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/register" className="uk-text-success">Sign up</Link>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  )
}
