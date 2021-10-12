import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserProfile from './pages/UserProfile'
import BusinessStore from 'pages/BusinessStore'
import { ProvideAuth } from 'hooks/useAuth'
import './index.css'

/** useAuth code came from snippets app */


ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter> 
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/User/:id' component={UserProfile} />
          <Route path='/store/:businessURL' component={BusinessStore} />
        </Switch>
      </BrowserRouter>
      <div>Hello world</div>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
)
