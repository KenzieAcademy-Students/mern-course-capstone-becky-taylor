import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import './BusinessEdit.css'
import axios from 'util/axiosConfig.js'

function BusinessEdit({ }) {
  const [isNewBusiness, setIsNewBusiness] = useState(false)
  const [business, setBusiness] = useState({})
  const [formSubmit, setFormSubmit] = useState(false)
  const [editing, setEditing] = useState(false)

  const handleClose = () => setEditing(false);
  const handleShow = () => setEditing(true);

  useEffect(() => {
    async function sendNewBusinessInfo() {
      try {
        // axios post/put request depending on isNewBusiness state
      } catch (err) {
        console.error(err.message)
      }
    }
    sendNewBusinessInfo()
  }, [formSubmit])

  return (
    <>
      <Button variant="success" onClick={handleShow}>Edit</Button>
      <Modal show={editing} onHide={handleClose}>
        <Form id="business-form">
            <Form.Group>
                <Form.Label>Business Name</Form.Label>
                <Form.Control placeholder="Business Name" value={business.businessName}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control placeholder="Description" value={business.businessDescription}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control placeholder="Address Line 1" value={business.address1}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control placeholder="Address Line 2" value={business.address2}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control placeholder="City" value={business.city}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Zip</Form.Label>
                <Form.Control placeholder="Zip" value={business.stateZip}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  )
}

export default BusinessEdit