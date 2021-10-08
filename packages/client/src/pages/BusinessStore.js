import React, { useState, useEffect } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import axios from 'util/axiosConfig.js'
import BusinessInfo from 'components/BusinessInfo'
import Category from 'components/Category'
import ProductForm from 'components/ProductForm'

export default function BusinessStore(props) {
  const [error, setError] = useState("")
  const [loggedIn, setLoggedIn] = useState(true)
  const [businessURL, setBusinessURL] = useState("thebestpub")
  const [businessObj, setBusinessObj] = useState({})
  const [products, setProducts] = useState([])
  const [refreshList, setRefreshList] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [delShow, setDelShow] = useState(false)
  const [currentProduct, setCurrentProduct] = useState("")

  const handleShowEditModal = (editProduct) => {
    setCurrentProduct(editProduct)
    setEditShow(true)
  }

  const handleShowDelModal = (deleteProduct) => {
    setCurrentProduct(deleteProduct)
    setDelShow(true)
  }

  const handleProductChange = async () => {
    setRefreshList(true)
    setEditShow(false)
  }

  const handleDelete = async () => {
    
    try {

      // remove deleted product from business products array and update business
      let productsArray = businessObj.products
      let foundIndex = -1
      productsArray.forEach((product, productIndex) => {
        if(product._id == currentProduct._id){
          foundIndex=productIndex
        }
      })
      if(foundIndex > -1){
        productsArray.splice(foundIndex, 1)
      }
      
      const updatedBusiness = await axios.put('businesses', 
        {
          "businessId": businessObj._id,
          "products": productsArray,
          "categories": businessObj.categories,
          "businessName": businessObj.businessName,
          "logo": businessObj.logo,
          "businessDescription": businessObj.businessDescription,
          "businessURL": businessObj.businessURL,
          "brandColor": businessObj.brandColor,
          "address1": businessObj.address1,
          "address2": businessObj.address2,
          "city": businessObj.city,
          "stateZip": businessObj.stateZip,
          "phone": businessObj.phone })

      const deleteProduct = await axios.delete(`products/${currentProduct._id}`)

      setRefreshList(true)
      setDelShow(false)

    } catch (err) {
      console.log("there has been an error: ", err)
    }    
  }

  useEffect(() => {
    
    const getBusiness = async () => {
      try {
        const businessFound = await axios.get(`businesses/by-name/${businessURL}`)
        const businessData = businessFound.data        
        
        setBusinessObj(businessFound.data)
        setProducts([...businessData.products])
        setRefreshList(false)
        
      } catch (err) {
        console.error(err.message)
        setError(err)
      }
    }
    getBusiness()
    
  }, [refreshList])

  return (
    <div>
      <BusinessInfo businessObj={businessObj} />
      
      <Category products={products} loggedIn={loggedIn} handleShowEditModal={handleShowEditModal} handleShowDelModal={handleShowDelModal} />

      <Card style={{ width: '60rem', border: '0px' }}>
        <Card.Body>
          <Card.Text> <b>New Product</b> </Card.Text>
          <ProductForm business={businessObj} product="" handleProductChange={handleProductChange} />          
        </Card.Body>
      </Card>
      

      <Modal size="lg" show={editShow}
        onHide={() => setEditShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><ProductForm business={businessObj} product={currentProduct} handleProductChange={handleProductChange} /></Modal.Body>
      </Modal>

      <Modal size="lg" show={delShow}
        onHide={() => setDelShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the following product? {currentProduct.productName}</p>
          <Button variant="success" onClick={handleDelete}>Yes</Button> <Button variant="danger" onClick={() => {setDelShow(false)}}>No</Button>
        </Modal.Body>
      </Modal>
    </div>
  )
}
