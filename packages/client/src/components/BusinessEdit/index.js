import React, { useEffect, useState } from 'react'
import './BusinessEdit.css'
import axios from 'util/axiosConfig.js'

function BusinessEdit({ }) {
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
    <div id="business-edit">
        
    </div>
  )
}

export default BusinessEdit