import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { AuthContextProvider } from './context/authContext'

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.querySelector('#app'))
