import React from 'react'
import { Form, Button } from 'react-bootstrap'
import './ProductForm.css'

function ProductForm({ product, handleProductChange }) {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.dir(e.target.elements.productName.value)
    const productData = {
      //productName: e.
    }
    handleProductChange()
  }

  return (
    <div>
     <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter product name" value={product.productName} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default ProductForm
