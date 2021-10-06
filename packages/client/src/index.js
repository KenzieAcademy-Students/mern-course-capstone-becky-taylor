import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserProfile from './pages/UserProfile'
import BusinessStore from 'pages/BusinessStore'
import './index.css'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/User/:id' component={UserProfile} />
        <Route exact path='/store' component={BusinessStore} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
