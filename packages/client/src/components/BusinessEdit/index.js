import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import './BusinessEdit.css'
import axios from 'util/axiosConfig.js'

function BusinessEdit({ business, handleBusinessChange, createOrEdit, handleClose }) {
  const [data, setData] = useState({})

  async function handleFormSubmit(e) {
    e.preventDefault()
    try {
      if (createOrEdit) {
        await axios.post('businesses', {
          "businessName": data.businessName,
          "businessURL": data.businessURL,
          "address1": data.address1,
          "address2": data.address2,
          "city": data.city,
          "stateZip": parseInt(data.stateZip),
          "phone": parseInt(data.phone)
        })
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
            <Form.Group>
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
                <Form.Group>
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
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  placeholder="Phone"
                  name="phone"
                  value={data.phone}
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
      </>)}
    </>
  )
}

export default BusinessEdit