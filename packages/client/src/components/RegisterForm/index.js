import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useProvideAuth } from 'hooks/useAuth'
import { setAuthToken } from 'util/axiosConfig'
import LoadingSpinner from 'components/LoadingSpinner'
import './RegisterForm.css'

const initialState = {
  name: '',
  password: '',
  password_again: '',
  email: '',
  isSubmitting: false,
  errorMessage: null,
}
function RegisterForm({ setShowRegisterModal }) {
  const [data, setData] = useState(initialState)
  const auth = useProvideAuth()

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }
  
  const handleRegister = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity() === false) {
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    
    try {

      if(data.password !== data.password_again) {

        //toast.error('Passwords do not match.')
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: 'Passwords do not match.',
        })

      } else {

        const res = await auth.signup(data.name, data.password, data.email)
        
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: null,
        })
        setAuthToken(res.token)
        setShowRegisterModal(false)
      }
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
     <Form noValidate validated style={{ width: '400px' }} onSubmit={handleRegister}>

        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            required
            value={data.name}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='emailRegister'>Email Address</Form.Label>
          <Form.Control
              type='email'
              name='email'
              required
              id='emailRegister'
              value={data.email}
              onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor='passwordRegister'>Password</Form.Label>
        <Form.Control
            type='password'
            name='password'
            id='password'
            required
            id='passwordRegister'
            value={data.password}
            onChange={handleInputChange}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor='passwordRegisterAgain'>Re-enter Password</Form.Label>
        <Form.Control
            type='password'
            name='password_again'
            required
            id='passwordRegisterAgain'
            value={data.password_again}
            onChange={handleInputChange}
        />
        </Form.Group>
        {data.errorMessage && (
          <span className='form-error text-warning'>{data.errorMessage}</span>
        )}
                
        <Button type='submit' disabled={data.isSubmitting}>
            {data.isSubmitting ? <LoadingSpinner /> : 'Sign up'}
        </Button>
                
      </Form>
    </div>
  )
}

export default RegisterForm
