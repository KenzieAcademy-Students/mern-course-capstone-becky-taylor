import React, { useEffect, useState } from 'react'
import './BusinessInfo.css'
import axios from 'util/axiosConfig.js'
import BusinessEdit from 'components/BusinessEdit'

function BusinessInfo({ }) {
  const [business, setBusiness] = useState({})

  useEffect(() => {
    async function getBusinessInfo() {
      try {
        const businessInfo = await axios.get('/businesses/6143810dc4773662ace01286')
        setBusiness(businessInfo.data)
      } catch (err) {
        console.error(err.message)
      }
    }
    getBusinessInfo()
  }, [])

  return (
    <div id="business-info">
      <BusinessEdit />
        <img src="https://www.mapbusinessonline.com/blog/wp-content/uploads/2021/05/earth_location_256x256.png" height="150px" width="150px" />
        <div id="business-text">
          <div id="business-name">{business.businessName}</div>
          <div>{business.businessDescription}</div>
        </div>
    </div>
  )
}

export default BusinessInfo