import React, { useState, useEffect } from 'react'
import { useProvideAuth } from 'hooks/useAuth'
import { useRequireAuth } from 'hooks/useRequireAuth'
import useRouter from 'hooks/useRouter'
import axios from 'util/axiosConfig.js'
import { Button, Modal } from 'react-bootstrap'
import LogInForm from 'components/LogInForm'
import RegisterForm from 'components/RegisterForm'
import BusinessEdit from 'components/BusinessEdit'
import { Image } from 'react-bootstrap'




export default function HomePage(props) {
  const { state, getCurrentUser, signout } = useProvideAuth()
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegisterBusinessModal, setShowRegisterBusinessModal] = useState(false);
  const [businessRegistered, setBusinessRegistered] = useState(false)

  const hideRegisterBusinessModal = () => setShowRegisterBusinessModal(false)

  const router = useRouter()

  const {
    state: { isAuthenticated },
  } = useRequireAuth()

  const sendToBusiness = async () => {
    const loggedInUser = await axios.get(`users/${state.user.uid}`)
    const business = await axios.get(`businesses/${loggedInUser.data.business[0]}`)
    // this will get the businessurl value and redirect to the business page
    router.push(`/store/${business.data.businessURL}`)
  }

  useEffect(() => {
    
      const checkForBusiness = async () => {
        try {
          const localUser = getCurrentUser()          
          if(localUser){
            const loggedInUser = await axios.get(`users/${localUser.uid}`)
            if(loggedInUser.data.business.length > 0){
              setBusinessRegistered(true)
            } else {
              setBusinessRegistered(false)
            }
          }
        } catch (err) {
          console.error(err.message)        
        }
      }
      checkForBusiness()
    
  }, [state])

  return (
    <main>
      <Image src='images/bongo_home.jpg' height='350px' />
      <h1>BONGO</h1>
      <h2 className="header"><p>"He can do it. So can you!"</p></h2>
      {!isAuthenticated ? (
        <>
          <Button onClick={() => setShowRegisterModal(true)} >Register</Button> &nbsp; 
          <Button onClick={() => setShowLogInModal(true)} >Log In</Button>
        </>
      ) : (
        <>
          {!businessRegistered && (
          <>
          <Button onClick={() => setShowRegisterBusinessModal(true)} >Register Your Business</Button> &nbsp;
          </>
          )}
          <Button onClick={() => sendToBusiness()} >Edit Your Business</Button> &nbsp;
          <Button onClick={() => signout()} >Log Out</Button> &nbsp;
        </>
      )}
      

      <Modal size="lg" show={showLogInModal}
        onHide={() => setShowLogInModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="login-modal">
            Log In
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><LogInForm setShowLogInModal={setShowLogInModal} /></Modal.Body>
      </Modal>

      <Modal size="lg" show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="register-modal">
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><RegisterForm setShowRegisterModal={setShowRegisterModal} /></Modal.Body>
      </Modal>

      <Modal size="lg" show={showRegisterBusinessModal}
        onHide={() => setShowRegisterBusinessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="register-business-modal">
            Register Your Business
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BusinessEdit business={{}} createOrEdit={true} handleClose={hideRegisterBusinessModal} setBusinessRegistered={setBusinessRegistered} />
        </Modal.Body>
      </Modal>
      
    </main>
  )
}
