import React, { useState } from 'react'
import './BusinessInfo.css'
import axios from 'util/axiosConfig.js'

function BusinessInfo({ }) {
  const [business, setBusiness] = useState({})

  return (
    <div>
        <div>Business Image</div>
        <div>Business Name</div>
        <div>Business Description</div>
    </div>
  )
}

export default BusinessInfo