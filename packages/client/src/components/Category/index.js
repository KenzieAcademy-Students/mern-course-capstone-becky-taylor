import React from 'react'
import { Card, Button } from 'react-bootstrap'
import './Category.css'
import ProductsList from 'components/ProductsList'

/*
 Need to build out the Category component to:
  -take in a category and it's corresponding list of products 
 */

function Category({ category, products, loggedIn, handleShowEditModal, handleShowDelModal }) {

  return (
    <div>
     <Card style={{ width: '100rem', border: '0px' }}>
        <Card.Body>          
          <b>Category 1</b> 
          {loggedIn && (
            <div>
              <Button variant="success">Edit</Button>
            </div>)}
        </Card.Body>
     </Card>
     <ProductsList products={products} loggedIn={loggedIn} handleShowEditModal={handleShowEditModal} handleShowDelModal={handleShowDelModal} />
    </div>
  )
}

export default Category
