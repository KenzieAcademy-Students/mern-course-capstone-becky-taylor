import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './BusinessInfo.css'
import axios from 'util/axiosConfig.js'
import BusinessEdit from 'components/BusinessEdit'
import { useProvideAuth } from 'hooks/useAuth'

function BusinessInfo({ businessObj, handleBusinessChange }) {
  const [refresh, setRefresh] = useState(false)
  const [editing, setEditing] = useState(false)
  
  function handleClose() {
    setEditing(false)
  }
  function handleShow() {
    setEditing(true)
  }

  async function handleBusinessEdit() {
    setRefresh(!refresh)
  }

  useEffect(() => {
    console.log(businessObj)
  }, [refresh])

  return (
    <>
      <div id="business-info">
          <img src="https://www.mapbusinessonline.com/blog/wp-content/uploads/2021/05/earth_location_256x256.png" height="150px" width="150px" />
          <div id="business-text">
            { businessObj && ( 
              <>
                <div id="business-name">{businessObj.businessName}</div>
                <div id="business-desc">{businessObj.businessDescription}</div>
              </>
            )}
          </div>
          <div>
          <Button variant="success" onClick={handleShow}>Edit</Button>
          <Modal show={editing} onHide={handleClose}>
            <BusinessEdit business={businessObj} handleBusinessChange={handleBusinessChange} createOrEdit={false} />
          </Modal>
          </div>
      </div>
    </>
  )
}

export default BusinessInfo