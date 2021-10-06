import React from 'react'
import { ListGroup, Image, Card, Button } from 'react-bootstrap'
import './ProductDetails.css'

function ProductDetails({ product, handleShowEditModal, handleShowDelModal, loggedIn }) {

  const handleEditClick = (editProduct) => {
    handleShowEditModal(editProduct)
  }

  const handleDeleteClick = (deleteProduct) => {
    handleShowDelModal(deleteProduct)
  }

  return (
    <div>
     <ListGroup horizontal>
      { product.image && 
      <ListGroup.Item><Image src={product.image} /></ListGroup.Item>
      }
      <ListGroup.Item>
      <Card style={{ width: '40rem', border: '0px' }}>
        <Card.Body>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text>
          {product.description}
          </Card.Text>
        </Card.Body>
      </Card>
      </ListGroup.Item>
      <ListGroup.Item>
      <Card style={{ width: '10rem', border: '0px' }}>
        <Card.Body>
          <Card.Title>${product.price.toFixed(2)}</Card.Title>
          <Card.Text>
            {loggedIn && (
            <div>
            <Button variant="success" 
              onClick={() => handleEditClick(product)} 
              key={`edit_${product._id}`}>Edit</Button> 
            <Button variant="danger" 
              onClick={() => handleDeleteClick(product)} 
              key={`del_${product._id}`}>X</Button>
              </div>)
            }
          </Card.Text>
        </Card.Body>
      </Card>
      </ListGroup.Item>
     </ListGroup>
    </div>
  )
}

export default ProductDetails
