import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Navbar from './Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="uk-container">
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
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
