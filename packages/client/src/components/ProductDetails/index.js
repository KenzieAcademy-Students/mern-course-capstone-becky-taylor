import React from 'react'
import { Button } from 'react-bootstrap'
import './ProductDetails.css'

function ProductDetails({ product, handleShowEditModal, handleShowDelModal, loggedIn }) {

  const handleEditClick = (editProduct) => {
    handleShowEditModal(editProduct)
  }

  const handleDeleteClick = (deleteProduct) => {
    handleShowDelModal(deleteProduct)
  }

  return (
    <div class="product-info">
        { product.image && 
          <img src={product.image} height="150px" width="150px" />
        }
          
        <div class="product-text">
          <div class="product-name">{product.productName}</div>
          <div class="product-desc">{product.description}</div>
        </div>
        <div class="product-price">${product.price.toFixed(2)}
          {loggedIn && (
            <div>
              <Button variant="success" onClick={() => handleEditClick(product)} key={`edit_${product._id}`}>Edit</Button> 
              <Button variant="danger" onClick={() => handleDeleteClick(product)} key={`del_${product._id}`}>X</Button>
            </div>
          )}
        </div>
    </div>
  
  )
}

export default ProductDetails
