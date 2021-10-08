import React, { useEffect, useState } from 'react'
import { Container, Image, Row, Col } from 'react-bootstrap'
import './BusinessInfo.css'
import axios from 'util/axiosConfig.js'
import BusinessEdit from 'components/BusinessEdit'

function BusinessInfo({ businessObj }) {
  const [business, setBusiness] = useState({})
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
  }, [refresh])

  return (
    <Container className="box">
        
      <Row id="business-info">
      <Col sm={true}>
          <Image src="https://www.mapbusinessonline.com/blog/wp-content/uploads/2021/05/earth_location_256x256.png" height="150px" width="150px" id="imageGlobe" rounded />
     </Col>
          <Row  id="business-text">
            <Col sm={true} id="business-name">businessPlaceHolderName{business.businessName}</Col>
            <Col sm={true} id="business-desc">{business.businessDescription}Placeholder description text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo erat et mi convallis, et suscipit massa porta. In ut ligula vel nunc scelerisque faucibus et eu nibh. Aliquam a gravida nisl, ac vulputate ligula. Integer et metus in urna eleifend feugiat varius non tellus. Fusce mattis eros quam, id ultrices justo feugiat vel. Nullam dapibus ornare porta. Donec ut posuere mi. In nec urna sit amet nunc vehicula accumsan in et lectus. Pellentesque tempus pulvinar nunc, vitae malesuada enim congue non. Nunc bibendum sem porta, varius ex sed, commodo elit. Maecenas vulputate sollicitudin erat volutpat finibus. Aenean eu lacus vel felis euismod luctus et eu ante. Aenean feugiat eleifend risus, id consequat justo tempor ut. Maecenas dignissim imperdiet luctus. Nulla ac velit ullamcorper, posuere nisl id, facilisis dolor. Morbi eu massa porta, rutrum libero ut, elementum sapien. Quisque erat magna, faucibus vitae ligula in, pellentesque aliquet erat. Morbi molestie ante quis nisl hendrerit hendrerit. Maecenas non auctor magna.</Col>
          </Row>
          <div>
          <BusinessEdit />
          </div>
      </Row>
    </Container>
  )
}

export default BusinessInfo