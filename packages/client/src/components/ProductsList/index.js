import React, { useState } from 'react'
import './ProductsList.css'
import ProductDetails from 'components/ProductDetails'


function ProductsList({ products, loggedIn, handleShowEditModal, handleShowDelModal }) {
  const [error, setError] = useState("")
  
  return (
    <div>
      { error && <h3 style={{color:"red"}}>Error Loading Data: {error}</h3>}
      { !error && products && (
        <div>{products.map((product) => (
          <ProductDetails handleShowEditModal={handleShowEditModal} handleShowDelModal={handleShowDelModal} key={product._id} product={product} loggedIn={loggedIn} />
        ))}</div>
      )}      
    </div>    
  )
}

export default ProductsList
