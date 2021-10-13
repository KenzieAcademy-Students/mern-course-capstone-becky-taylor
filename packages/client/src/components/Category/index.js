import React from 'react'
import { Card, Button } from 'react-bootstrap'
import './Category.css'
import ProductsList from 'components/ProductsList'

function Category({ category, products, loggedIn, handleShowEditModalCat, handleShowDelModalCat, handleShowEditModal, handleShowDelModal }) {

  const handleEditClick = (editCategory) => {
    handleShowEditModalCat(editCategory)
  }

  const handleDeleteClick = (deleteCategory) => {
    handleShowDelModalCat(deleteCategory)
  }

  return (
    <div>
     <Card style={{ width: '100rem', border: '0px' }}>
        <Card.Body>          
          <b>{category.categoryName}</b> 
          {loggedIn && (
            <div>
            <Button variant="success" 
              onClick={() => handleEditClick(category)} 
              key={`edit_c_${category._id}`}>Edit</Button> 
            <Button variant="danger" 
              onClick={() => handleDeleteClick(category)} 
              key={`del_c_${category._id}`}>X</Button>
              </div>)
            }
        </Card.Body>
     </Card>
     <ProductsList products={products} loggedIn={loggedIn} handleShowEditModal={handleShowEditModal} handleShowDelModal={handleShowDelModal} />
    </div>
  )
}

export default Category
