import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'util/axiosConfig.js'
import './ProductForm.css'

function ProductForm({ product, handleProductChange, business }) {
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productQuantity, setProductQuantity] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [uploadedFile, setUploadedFile] = useState()
  const [imageURL, setImageURL] = useState("")
  const [categoriesArray, setCategoriesArray] = useState([])
  
  const handleImageUpload = (e) => {
    // call the image upload route here
    setUploadedFile(e.target.files[0])
  }

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

    let upload_path=''

    if(uploadedFile){
      // create FormData object, append the file to the FormData object, call the upload endpoint to upload the file and return the path
      
      let formUploadData = new FormData();

      formUploadData.append("product_image_upload", uploadedFile);
      
      const productImagePath = await axios.post(`products/upload-image`, formUploadData, { headers: {'Content-Type': `multipart/form-data;`,} });

      upload_path = productImagePath.data.filePath
      setImageURL(upload_path)
      
    }

    try {
      if(productId){
        // update base product info
        const updatedProduct = await axios.put(`products/${productId}`,
          { productName: productName, 
            productDescription: productDescription, 
            productPrice: productPrice, 
            productQuantity: productQuantity, 
            productCategory: productCategory,
            productImage: upload_path || imageURL })

        // since the products are tied by reference to the business, no need to update the business data on a product update
        
      } else {
        const addedProduct = await axios.post('products',
          { productName: productName, 
            productDescription: productDescription, 
            productPrice: productPrice, 
            productQuantity: productQuantity, 
            productCategory: productCategory,
            productImage: upload_path || imageURL })

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
        setImageURL("")
        setProductId("")
      }

    } catch (err) {
      console.log("there has been an error.")
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
          setImageURL(product.image)
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
     <Form encType="multipart/form-data" onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="productId">
        <Form.Control type="hidden" value={product._id} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter product name" 
          name="productName"
          value={productName} 
          onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productDescription">
        <Form.Label>Product Description</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter product description" 
          name="productDescription" 
          value={productDescription} 
          onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productPrice">
        <Form.Label>Product Price</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Enter product price"
          name="productPrice" 
          value={productPrice} 
          onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productQuantity">
        <Form.Label>Product Quantity</Form.Label>
        <Form.Control 
          type="number"
          placeholder="Enter quantity" 
          name="productQuantity" 
          value={productQuantity} 
          onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productImage">
        <Form.Label>Upload a Product Image</Form.Label>
        <Form.Control 
          type="file" 
          name="productImage"
          accept="file"
          onChange={handleImageUpload}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productCategory">
        <Form.Label>Product Category</Form.Label>
        
        <Form.Control as="select" name="productCategory" value={productCategory} onChange={handleInputChange}>
          <option>Select a category</option>
          {categoryOptions}
        </Form.Control>


      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default ProductForm
