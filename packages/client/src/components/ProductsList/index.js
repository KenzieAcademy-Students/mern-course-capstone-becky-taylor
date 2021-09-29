import React, { useState, useEffect } from 'react'
import './ProductsList.css'
import axios from 'util/axiosConfig.js'
import ProductDetails from 'components/ProductDetails'

function ProductsList({ }) {
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")
  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await axios.get('products')

        console.dir(allProducts.data)
        
        //setProducts(allProducts.data)
        
      } catch (err) {
        console.error(err.message)
        //setError(err)
      }
    }
    getProducts()
  }, [])
  

  return (
    <div>
      Hello from Products List
      { error && <h3 style={{color:"red"}}>Error Loading Data: {error}</h3>}
      { !error && products && (
        <div>Products: {products}</div>
      )}
      <ProductDetails />
    </div>
  )
}

export default ProductsList
