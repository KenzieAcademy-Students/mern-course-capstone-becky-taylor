import React, { useState } from 'react'
import './BusinessInfo.css'
import axios from 'util/axiosConfig.js'

function BusinessInfo({ }) {
  const [business, setBusiness] = useState({})

  async function getBusinessInfo() {
    try {
      const businessInfo = await axios.get('/business')
      console.log(businessInfo)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div>
        <div>Business Image</div>
        <div>Business Name</div>
        <div>Business Description</div>
    </div>
  )
}

export default BusinessInfo