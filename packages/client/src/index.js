import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserProfile from './pages/UserProfile'
import './index.css'
import NavBar from './components/NavBar'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
    <NavBar/> 
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/User/:id' component={UserProfile} />
        { /* Add more routes here */} 
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
