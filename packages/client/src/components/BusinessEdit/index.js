import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import './BusinessEdit.css'
import axios from 'util/axiosConfig.js'
import { useProvideAuth } from 'hooks/useAuth'

function BusinessEdit({ handleBusinessChange }) {
  const { state: { business } } = useProvideAuth()

  const [data, setData] = useState({})
  const [formSubmit, setFormSubmit] = useState(false)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const auth = useProvideAuth()

  function handleClose() {
    setEditing(false)
  }
  function handleShow() {
    setEditing(true)
  }

  async function handleInputChange(e) {
    setData({ ...business })
    let updatedBusiness = { ...data }
    updatedBusiness[e.target.name] = e.target.value
    console.log(updatedBusiness)
    setData(updatedBusiness)
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    setFormSubmit(true)
    async function sendNewBusinessInfo() {
      try {
        // const updatedBusiness = await axios.put('businesses',
        //   {
        //     "businessId": data._id,
        //     "products": data.products,
        //     "categories": data.categories,
        //     "businessName": data.businessName,
        //     "logo": data.logo,
        //     "businessDescription": data.businessDescription,
        //     "businessURL": data.businessURL,
        //     "brandColor": data.brandColor,
        //     "address1": data.address1,
        //     "address2": data.address2,
        //     "city": data.city,
        //     "stateZip": data.stateZip,
        //     "phone": data.phone
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
    if (business) {
      setData({ ...business })
    }
  }, [business])

  return (
    <>
      <Button variant="success" onClick={handleShow}>Edit</Button>
      <Modal show={editing} onHide={handleClose}>
        { business && ( 
          <>
            <Form id="business-form" onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      placeholder="Business Name"
                      name="businessName"
                      value={data.businessName} 
                      onChange={handleInputChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      placeholder="Description"
                      name="businessDescription"
                      value={data.businessDescription}
                      onChange={handleInputChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                      placeholder="Address Line 1"
                      name="address1"
                      value={data.address1}
                      onChange={handleInputChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                      placeholder="Address Line 2" 
                      name="address2"
                      value={data.address2}
                      onChange={handleInputChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      placeholder="City" 
                      name="city"
                      value={data.city}
                      onChange={handleInputChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      placeholder="Zip"
                      name="stateZip"
                      value={data.stateZip}
                      onChange={handleInputChange}
                    ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </>
        )}
      </Modal>
    </>
  )
}

export default BusinessEdit