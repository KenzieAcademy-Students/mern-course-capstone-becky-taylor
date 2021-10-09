import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserProfile from './pages/UserProfile'
import BusinessStore from 'pages/BusinessStore'
import { ProvideAuth } from 'hooks/useAuth'
import './index.css'

/** look at snippets useAuth stuff (see snippets index.js) */


ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter> 
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/User/:id' component={UserProfile} />
          <Route exact path='/store/:businessURL' component={BusinessStore} />
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
)
