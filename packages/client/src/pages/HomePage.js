import React, { useState } from 'react'
import { useProvideAuth } from 'hooks/useAuth'
import { useRequireAuth } from 'hooks/useRequireAuth'
import { Button, Modal } from 'react-bootstrap'
import LogInForm from 'components/LogInForm'
import RegisterForm from 'components/RegisterForm'
import BusinessEdit from 'components/BusinessEdit'
import { Image } from 'react-bootstrap'
import "./HomePage.css"



export default function HomePage(props) {
  const { state, signout } = useProvideAuth()
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegisterBusinessModal, setShowRegisterBusinessModal] = useState(false);
  const [editing, setEditing] = useState(false)

  const handleClose = () => setEditing(false)
  const handleShow = () => setEditing(true)

  const {
    state: { isAuthenticated },
  } = useRequireAuth()

  const sendToBusiness = () => {
    console.dir(state)
    // this will get the businessurl value and redirect to the business page
  }
  
  return (
    <main className="container-fluid" id="home-container">
      <Image src='images/bongo_logo.png' />
      <div className="container-sm p-5 my-5 bg-dark text-white" id="header-container">
      <h1 className="col-md" id="header-logo">BONGO</h1>
      <h2 className="col-md" id="header-quote"><p>"He can do it. So can you!"</p></h2>
      </div>

      <div className="row">
      {!isAuthenticated ? (
        <div className="col">
          <Button onClick={() => setShowRegisterModal(true)} >Register</Button> &nbsp; 
          <Button onClick={() => setShowLogInModal(true)} >Log In</Button>
        </div>
      ) : (
        <div className="col">
          <Button onClick={() => setShowRegisterBusinessModal(true)} className="btn btn-warning">Register Your Business</Button> &nbsp;
          <Button onClick={() => sendToBusiness()} className="btn btn-secondary" id="edit-btn">Edit Your Business</Button> &nbsp;
          <Button onClick={() => signout()} className="btn btn-danger" id="sign-out">Log Out</Button> &nbsp;
        </div>
      )}
      </div>
      

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
          <Button variant="success" onClick={handleShow}>Edit</Button>
          <Modal show={editing} onHide={handleClose}>
            <BusinessEdit business={{}} createOrEdit={true} />
          </Modal>
        </Modal.Body>
      </Modal>
      
    </main>
  )
}
