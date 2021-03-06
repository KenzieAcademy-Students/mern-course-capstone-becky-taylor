import React, { useEffect, useState } from 'react'
import { Form, Button, Modal, Container } from 'react-bootstrap'
import './BusinessEdit.css'
import axios from 'util/axiosConfig.js'
import { useProvideAuth } from 'hooks/useAuth'

function BusinessEdit({ business, handleBusinessChange, createOrEdit, handleClose, setBusinessRegistered }) {
  const [data, setData] = useState({})
  const { state } = useProvideAuth()

  async function handleFormSubmit(e) {
    e.preventDefault()
    try {
      if (createOrEdit) {
        const newBusiness = await axios.post('businesses', {
          "businessName": data.businessName,
          "businessURL": data.businessURL,
          "address1": data.address1,
          "address2": data.address2,
          "city": data.city,
          "stateZip": parseInt(data.stateZip),
          "phone": parseInt(data.phone)
        })
        await axios.put('users', {
          "userId": state.user.uid,
          "business": [ newBusiness.data ]
        })
        setBusinessRegistered(true)
        handleClose()
      } else {
        await axios.put('businesses', {
          "businessId": data._id,
          "products": data.products,
          "categories": data.categories,
          "businessName": data.businessName,
          "logo": data.logo,
          "businessDescription": data.businessDescription,
          "businessURL": data.businessURL,
          "brandColor": data.brandColor,
          "address1": data.address1,
          "address2": data.address2,
          "city": data.city,
          "stateZip": parseInt(data.stateZip),
          "phone": parseInt(data.phone)
        })
        handleBusinessChange()
        handleClose()
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleInputChange(e) {
    let updatedBusiness = { ...data }
    updatedBusiness[e.target.name] = e.target.value
    setData(updatedBusiness)
  }

  useEffect(() => {
    if (business) {
      setData({ ...business })
    }
  }, [business])

  return (
    <>
      { business && ( <>
        <Form id="business-form" onSubmit={handleFormSubmit}>
            <Form.Group className="formGroup">
                <Form.Label>Business Name</Form.Label>
                <Form.Control 
                  placeholder="Business Name"
                  name="businessName"
                  value={data.businessName}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            {createOrEdit ? (
              <>
                <Form.Group className="formGroup">
                  <Form.Label>Business URL</Form.Label>
                  <Form.Control
                    placeholder="Business URL"
                    name="businessURL"
                    value={data.businessURL} 
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
              </>
            ) : (
              <></>
            )}
            <Form.Group className="formGroup">
                <Form.Label>Logo (Please provide a URL)</Form.Label>
                <Form.Control
                  placeholder="Logo"
                  name="logo"
                  value={data.logo}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="formGroup">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  placeholder="Description"
                  name="businessDescription"
                  value={data.businessDescription}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="formGroup">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  placeholder="Phone"
                  name="phone"
                  value={data.phone}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="formGroup">
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control 
                  placeholder="Address Line 1" 
                  name="address1"
                  value={data.address1}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="formGroup">
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control 
                  placeholder="Address Line 2" 
                  name="address2"
                  value={data.address2}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="formGroup">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  placeholder="City" 
                  name="city"
                  value={data.city}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="formGroup">
                <Form.Label>Zip</Form.Label>
                <Form.Control 
                  placeholder="Zip" 
                  name="stateZip"
                  value={data.stateZip}
                  onChange={handleInputChange}
                ></Form.Control>
            </Form.Group>
           
            <Button variant="primary" type="submit" id="sbMt-Btn">Submit</Button>
          

        </Form>
      </>)}
    </>
  )
}

export default BusinessEdit