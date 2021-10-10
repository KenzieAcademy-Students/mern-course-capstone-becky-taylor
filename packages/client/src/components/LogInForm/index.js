import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useProvideAuth } from 'hooks/useAuth'
import { setAuthToken } from 'util/axiosConfig'
import LoadingSpinner from 'components/LoadingSpinner'
import './LogInForm.css'

const initialState = {
  email: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
}
function LogInForm({ setShowLogInModal }) {
  const [data, setData] = useState(initialState)
  const auth = useProvideAuth()
 
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }
  
  const handleLogIn = async (event) => {
    const form = event.currentTarget
    // this piece of code seems pointless since we stop propogation immediately after this guard clause...worth testing
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    event.preventDefault()
    event.stopPropagation()
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    try {
      const res = await auth.signin(data.email, data.password)
      setAuthToken(res.token)
      setShowLogInModal(false)
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      })
    }
  }
 

  return (
    <div>
     <Form noValidate validated style={{ width: '400px' }} onSubmit={handleLogIn} >
        
        <Form.Group controlId='emailAddress'>
          <Form.Label htmlFor='email'>Email Address</Form.Label>
            <Form.Control
              type='text'
              name='email'
              id='email'
              placeholder='email address'
              required
              value={data.email}
              onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='passwordLogIn'>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            id='passwordLogIn'
            required
            value={data.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        {data.errorMessage && (
          <span className='form-error text-warning'>{data.errorMessage}</span>
        )}
        <Button type='submit' disabled={data.isSubmitting}>
          {data.isSubmitting ? <LoadingSpinner /> : 'Login'}
        </Button>
      </Form>
    </div>
  )
}

export default LogInForm
