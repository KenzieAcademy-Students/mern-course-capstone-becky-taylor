import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './BusinessInfo.css'
import axios from 'util/axiosConfig.js'
import BusinessEdit from 'components/BusinessEdit'
import { useProvideAuth } from 'hooks/useAuth'

function BusinessInfo({ businessObj, handleBusinessChange }) {
  const [refresh, setRefresh] = useState(false)
  const { state } = useProvideAuth()

  async function handleBusinessEdit() {
    setRefresh(!refresh)
  }

  useEffect(() => {
    console.log(state.business)
  }, [refresh])

  return (
    <>
      <div id="business-info">
          <img src="https://www.mapbusinessonline.com/blog/wp-content/uploads/2021/05/earth_location_256x256.png" height="150px" width="150px" />
          <div id="business-text">
            { state.business && ( 
              <>
                <div id="business-name">{state.business.businessName}</div>
                <div id="business-desc">{state.business.businessDescription}</div>
              </>
            )}
          </div>
          <div>
          <BusinessEdit business={businessObj} handleBusinessChange={handleBusinessChange} />
          </div>
      </div>
    </>
  )
}

export default BusinessInfo