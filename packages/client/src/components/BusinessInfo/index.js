import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './BusinessInfo.css'
import axios from 'util/axiosConfig.js'
import BusinessEdit from 'components/BusinessEdit'

function BusinessInfo({ businessObj, handleBusinessChange }) {
  const [business, setBusiness] = useState({ ...businessObj })
  const [refresh, setRefresh] = useState(false)

  async function handleBusinessEdit() {
    setRefresh(!refresh)
  }

  useEffect(() => {
    /*async function getBusinessInfo() {
      try {
        const businessInfo = await axios.get('/businesses/6143810dc4773662ace01286')
        setBusiness(businessInfo.data)
      } catch (err) {
        console.error(err.message)
      }
    }
    getBusinessInfo()*/
    setBusiness(businessObj)
    console.log(businessObj)
  }, [refresh])

  return (
    <>
      <div id="business-info">
          <img src="https://www.mapbusinessonline.com/blog/wp-content/uploads/2021/05/earth_location_256x256.png" height="150px" width="150px" />
          <div id="business-text">
            <div id="business-name">{businessObj.businessName}</div>
            <div id="business-desc">{businessObj.businessDescription}</div>
          </div>
          <div>
          <BusinessEdit business={businessObj} handleBusinessChange={handleBusinessChange} />
          </div>
      </div>
    </>
  )
}

export default BusinessInfo