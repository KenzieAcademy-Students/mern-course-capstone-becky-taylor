import React, { useState } from 'react'
import { useProvideAuth } from 'hooks/useAuth'
import { useRequireAuth } from 'hooks/useRequireAuth'
import { Button, Modal } from 'react-bootstrap'
import LogInForm from 'components/LogInForm'
import RegisterForm from 'components/RegisterForm'
import BusinessEdit from 'components/BusinessEdit'
import { Image } from 'react-bootstrap'




export default function HomePage(props) {
  const { state, signout } = useProvideAuth()
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegisterBusinessModal, setShowRegisterBusinessModal] = useState(false);

  const {
    state: { isAuthenticated },
  } = useRequireAuth()

  const sendToBusiness = () => {
    console.dir(state)
    // this will get the businessurl value and redirect to the business page
  }

  return (
    <main>
      <Image src='images/bongo_logo.png' />
      <h1>BONGO</h1>
      <h2 className="header"><p>"He can do it. So can you!"</p></h2>
      {!isAuthenticated ? (
        <>
          <Button onClick={() => setShowRegisterModal(true)} >Register</Button> &nbsp; 
          <Button onClick={() => setShowLogInModal(true)} >Log In</Button>
        </>
      ) : (
        <>
          <Button onClick={() => setShowRegisterBusinessModal(true)} >Register Your Business</Button> &nbsp;
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
          <BusinessEdit business={{}} createOrEdit={true} />
        </Modal.Body>
      </Modal>
      
    </main>
  )
}
