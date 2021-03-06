import React, { useReducer, useEffect, useContext, createContext } from 'react'
import useRouter from 'hooks/useRouter'
import axios from 'util/axiosConfig.js'

const initialState = {
  isAuthenticated: null,
  user: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

const authContext = createContext()

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <authContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext)
}

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const { state, dispatch } = useAuth()
  const router = useRouter()

  const signin = async (email, password) => {
    try {
      const response = await axios.post(`auth/signin`, {
        email: email,
        password: password,
      })
      localStorage.setItem('MernAppUser', JSON.stringify(response.data))
      dispatch({
        type: 'LOGIN',
        payload: response.data,
      })
      return response
    } catch (error) {
      
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  }

  const signup = async (name, password, email) => {
    try {
      await axios.post(`auth/signup`, {
        name: name,
        password: password,
        email: email
      })
      return await signin(email, password)
    } catch (error) {
      
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  }

  const signout = () => {
    dispatch({
      type: 'LOGOUT',
    })
    //router.push('/')
  }

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('MernAppUser'))
  }

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('MernAppUser')) || false
    if (savedUser) {
      dispatch({
        type: 'LOGIN',
        payload: savedUser,
      })
    } else {
      dispatch({
        type: 'LOGOUT',
      })
    }
  }, [dispatch])

  // Return the user object and auth methods
  return {
    state,
    getCurrentUser,
    signin,
    signup,
    signout,
  }
}
