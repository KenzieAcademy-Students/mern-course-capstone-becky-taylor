import React, { useState, useEffect } from 'react'
import './ProductsList.css'
import { useApiFetch } from "util/api"
import ProductDetails from 'components/ProductDetails'

function ProductsList({ }) {
  const {error, response} = useApiFetch("/products", {method: "GET"})
  const {products, setProducts} = useState([])
  /*useEffect(() => {
      
      try {
        const res = useApiFetch("/products", {method: "GET"})
        setProducts(res)
        
      } catch (error) {
        console.log(error)
      }
   
  }, []);*/
  

  return (
    <div>
      Hello from Products List
      { error && <h3 style={{color:"red"}}>Error Loading Data: {error}</h3>}
      { !error && response && (
        <div>Products: {response}</div>
      )}
      <ProductDetails />
    </div>
  )
}

export default ProductsList
