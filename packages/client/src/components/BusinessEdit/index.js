import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import './BusinessEdit.css'
import axios from 'util/axiosConfig.js'

function BusinessEdit({ business, handleBusinessChange }) {
  // const [isNewBusiness, setIsNewBusiness] = useState(existingBusiness)
  const [currentBusiness, setCurrentBusiness] = useState({ ...business })
  const [formSubmit, setFormSubmit] = useState(false)
  const [editing, setEditing] = useState(false)

  function handleClose() {
    setEditing(false)
  }
  function handleShow() {
    setEditing(true)
  }

  async function handleInputChange(e) {
    let updatedBusiness = { ...currentBusiness }
    updatedBusiness[e.target.name] = e.target.value
    console.log(updatedBusiness)
    setCurrentBusiness(updatedBusiness)
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    setFormSubmit(true)
    async function sendNewBusinessInfo() {
      try {
        // const updatedBusiness = await axios.put('businesses',
        //   {
        //     "businessId": currentBusiness._id,
        //     "products": currentBusiness.products,
        //     "categories": currentBusiness.categories,
        //     "businessName": currentBusiness.businessName,
        //     "logo": currentBusiness.logo,
        //     "businessDescription": currentBusiness.businessDescription,
        //     "businessURL": currentBusiness.businessURL,
        //     "brandColor": currentBusiness.brandColor,
        //     "address1": currentBusiness.address1,
        //     "address2": currentBusiness.address2,
        //     "city": currentBusiness.city,
        //     "stateZip": currentBusiness.stateZip,
        //     "phone": currentBusiness.phone
        //   }
        // ) 
        handleBusinessChange()
        handleClose()
      } catch (err) {
        console.error(err.message)
      }
    }
    sendNewBusinessInfo()
    setFormSubmit(false)
  }

  useEffect(() => {
    console.log(business)
    setCurrentBusiness({ ...business })
  }, [formSubmit])

  return (
    <>
      <Button variant="success" onClick={handleShow}>Edit</Button>
      <Modal show={editing} onHide={handleClose}>
        <Form id="business-form" onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  placeholder="Business Name"
                  name="businessName"
                  value={currentBusiness.businessName} 
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder="Description"
                  name="businessDescription"
                  value={business.businessDescription}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control
                  placeholder="Address Line 1"
                  name="address1"
                  value={business.address1}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control
                  placeholder="Address Line 2" 
                  name="address2"
                  value={business.address2}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="City" 
                  name="city"
                  value={business.city}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  placeholder="Zip"
                  name="stateZip"
                  value={business.stateZip}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  )
}

export default BusinessEdit