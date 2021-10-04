import React, { useState, useEffect } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import './ProductsList.css'
import axios from 'util/axiosConfig.js'
import ProductDetails from 'components/ProductDetails'

function ProductsList({ }) {
  const [error, setError] = useState("")
  const [products, setProducts] = useState([])
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await axios.get('products')
        const displayProducts = allProducts.data        
        
        setProducts([...displayProducts])
        
      } catch (err) {
        console.error(err.message)
        setError(err)
      }
    }
    getProducts()
  }, [])
  

  return (
    <div>
      { error && <h3 style={{color:"red"}}>Error Loading Data: {error}</h3>}
      <Card style={{ width: '100rem', border: '0px' }}>
        <Card.Body>
          <Card.Text>
          <b>Category 1</b> <Button variant="success">Edit</Button>
          </Card.Text>
        </Card.Body>
      </Card>
      { !error && products && (
        <div>{products.map((product) => (
          <ProductDetails handleShowEditModal={handleShowEditModal} handleShowDelModal={handleShowDelModal} key={product._id} product={product} />
        ))}</div>
      )}

      <Card style={{ width: '100rem', border: '0px' }}>
        <Card.Body>
          <Card.Text>
          <b>Category 2</b> <Button variant="success">Edit</Button>
          </Card.Text>
        </Card.Body>
      </Card>
      { !error && products && (
        <div>{products.map((product) => (
          <ProductDetails handleShowEditModal={handleShowEditModal} handleShowDelModal={handleShowDelModal} key={product._id} product={product} />
        ))}</div>
      )}
      

      <Modal size="lg" show={editShow}
        onHide={() => setEditShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{currentProduct.productName}</Modal.Body>
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
        <Modal.Body>Are you sure you want to delete {currentProduct.productName}?</Modal.Body>
      </Modal>
      
    </div>    
  )
}

export default ProductsList
