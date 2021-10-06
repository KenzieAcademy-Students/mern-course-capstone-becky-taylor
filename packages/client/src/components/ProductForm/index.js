import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'util/axiosConfig.js'
import './ProductForm.css'

function ProductForm({ product, handleProductChange }) {
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productQuantity, setProductQuantity] = useState("")
  const [uploadedFile, setUploadedFile] = useState()
  const [imageURL, setImageURL] = useState("")
  
  
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
        const updatedProduct = await axios.put(`products/${productId}`,
          { productName: productName, 
            productDescription: productDescription, 
            productPrice: productPrice, 
            productQuantity: productQuantity, 
            productImage: upload_path || imageURL })
      } else {
        const addedProduct = await axios.post('products',
          { productName: productName, 
            productDescription: productDescription, 
            productPrice: productPrice, 
            productQuantity: productQuantity, 
            productImage: upload_path || imageURL })

          setProductName("")
          setProductDescription("")
          setProductPrice("")
          setProductQuantity("")
          setImageURL("")
          setProductId("")
      }

    } catch (err) {
      console.log("there has been an error.")
    }    
  
    handleProductChange()
  }

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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default ProductForm
