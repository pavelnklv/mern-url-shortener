import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Home from '../pages/Home'
import PrivateHome from '../pages/PrivateHome'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Navbar from './Navbar'

export default function App() {
  const { loading, me } = useContext(AuthContext)

  if (loading) return <p className="uk-text-center">loading...</p>
  return (
    <BrowserRouter>
      <Navbar />
      <div className="uk-container">
        <Switch>
          <Route
            exact
            path="/"
            component={me ? PrivateHome : Home}
          />
          <Route
            exact
            path="/login"
            component={Login}
          />
          <Route
            exact
            path="/register"
            component={Register}
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
