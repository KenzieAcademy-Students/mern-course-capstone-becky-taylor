import React, { useEffect, useState } from 'react'
import { Container, Image, Row, Col, Button, Modal } from 'react-bootstrap'
import './BusinessInfo.css'
import axios from 'util/axiosConfig.js'
import BusinessEdit from 'components/BusinessEdit'

function BusinessInfo({ businessObj, handleBusinessChange, loggedIn }) {
  const [editing, setEditing] = useState(false)

  const handleClose = () => setEditing(false)
  const handleShow = () => setEditing(true)

  return (
    <>
      <div id="business-info">
          <img src="https://www.mapbusinessonline.com/blog/wp-content/uploads/2021/05/earth_location_256x256.png" height="150px" width="150px" />
          <div id="business-text">
            <div id="business-name">{businessObj.businessName}</div>
            <div id="business-desc">{businessObj.businessDescription}</div>
          </div>
          <div>

          { loggedIn && 
            <Button variant="success" onClick={handleShow}>Edit</Button>
          }

          <Modal show={editing} onHide={handleClose}>
            <BusinessEdit business={businessObj} handleBusinessChange={handleBusinessChange} createOrEdit={false} handleClose={handleClose} />
          </Modal>
          </div>
      </div>
    </>
  )
}

export default BusinessInfo