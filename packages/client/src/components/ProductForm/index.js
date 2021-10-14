import React, { useState, useEffect } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import axios from 'util/axiosConfig.js'
import './ProductForm.css'

function ProductForm({ product, handleProductChange, business }) {
  const [validated, setValidated] = useState(false);
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productQuantity, setProductQuantity] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productImage, setProductImage] = useState("")
  const [categoriesArray, setCategoriesArray] = useState([])
  
  const handleInputChange = (e) => {
    
    switch(e.target.name) {
      case "productName":
        setProductName(e.target.value)
        break;
      case "productDescription":
        setProductDescription(e.target.value)
        break;
      case "productPrice":
        setProductPrice(e.target.value)
        break;
      case "productQuantity":
        setProductQuantity(e.target.value)
        break;
      case "productImage":
        setProductImage(e.target.value)
        break;
      case "productCategory":
        setProductCategory(e.target.value)
        break;
      default:
        console.error("Unknown form field: ", e.target.name)
    } 
    

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.checkValidity() === false) {
      //if form is invalid, return false?
      return false
    }
    setValidated(true);

    try {
      if(productId){
        // update base product info
        const updatedProduct = await axios.put(`products/${productId}`,
          { productName: productName, 
            productDescription: productDescription, 
            productPrice: productPrice, 
            productQuantity: productQuantity, 
            productCategory: productCategory,
            productImage: productImage })

        // since the products are tied by reference to the business, no need to update the business data on a product update
        
      } else {
        const addedProduct = await axios.post('products',
          { productName: productName, 
            productDescription: productDescription, 
            productPrice: productPrice, 
            productQuantity: productQuantity, 
            productCategory: productCategory,
            productImage: productImage })

        // append new product to business products array and update business
        let productsArray = business.products
        productsArray.push(addedProduct.data)
        
        const updatedBusiness = await axios.put('businesses', 
          {
            "businessId": business._id,
            "products": productsArray,
            "categories": business.categories,
            "businessName": business.businessName,
            "logo": business.logo,
            "businessDescription": business.businessDescription,
            "businessURL": business.businessURL,
            "brandColor": business.brandColor,
            "address1": business.address1,
            "address2": business.address2,
            "city": business.city,
            "stateZip": business.stateZip,
            "phone": business.phone })


        setProductName("")
        setProductDescription("")
        setProductPrice("")
        setProductQuantity("")
        setProductCategory("")
        setProductImage("")
        setProductId("")
      }

    } catch (err) {
      console.error("there has been an error.")
    }    
  
    handleProductChange()
  }

  const categoryOptions = categoriesArray.map((category) => {
    return (
      <option key={category._id} value={category._id}>
        {category.categoryName}
      </option>
    )
  })

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if(product){

          setProductName(product.productName)
          setProductDescription(product.description)
          setProductPrice(product.price)
          setProductQuantity(product.quantity)
          setProductImage(product.image)
          setProductId(product._id)
          setProductCategory(product.category)
          setCategoriesArray(business.categories)

        } else {    

          setCategoriesArray(business.categories)
          
        }

      } catch (err) {
        console.error(err.message)       
      }
      
    }
    loadProduct()
  }, [])

  return (
    <div>
     <Form validated={validated} encType="multipart/form-data" onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="productId">
        <Form.Control type="hidden" value={product._id} />
      </Form.Group>
      <InputGroup>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter product name" 
            required
            name="productName"
            value={productName} 
            onChange={handleInputChange} />
        </Form.Group>
      </InputGroup>
      
      <Form.Group className="mb-3" controlId="productDescription">
        <Form.Label>Product Description</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter product description" 
          name="productDescription" 
          value={productDescription} 
          onChange={handleInputChange} />
      </Form.Group>
      
      <InputGroup>
        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter product price"
            required
            name="productPrice" 
            value={productPrice} 
            onChange={handleInputChange} />
        </Form.Group>
        &nbsp;
        <Form.Group className="mb-3" controlId="productQuantity">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control 
            type="number"
            placeholder="Enter quantity" 
            required
            name="productQuantity" 
            value={productQuantity} 
            onChange={handleInputChange} />
        </Form.Group>
      </InputGroup>

      <Form.Group className="mb-3" controlId="productImage">
        <Form.Label>Product Image</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter product image url" 
          name="productImage" 
          value={productImage} 
          onChange={handleInputChange} />
      </Form.Group>

      <InputGroup>
      <Form.Group className="mb-3" controlId="productCategory">
        <Form.Label>Product Category</Form.Label>        
        <Form.Control as="select" name="productCategory" value={productCategory} onChange={handleInputChange}>
          <option>Select a category</option>
          {categoryOptions}
        </Form.Control>
      </Form.Group>
      </InputGroup>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default ProductForm
