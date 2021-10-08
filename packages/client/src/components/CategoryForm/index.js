import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'util/axiosConfig.js'
import './CategoryForm.css'

function CategoryForm({ category, handleCategoryChange, business }) {
  const [categoryId, setCategoryId] = useState("")
  const [categoryName, setCategoryName] = useState("")
  
  const handleInputChange = (e) => {
    setCategoryName(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if(categoryId){
        // update base category info
        const updatedCategory = await axios.put(`categories/${categoryId}`,
          { name: categoryName })

        // since the categories are tied by reference to the business, no need to update the business data on a product update
        
      } else {
        const addedCategory = await axios.post('categories',
          { name: categoryName })

        // append new category to business categories array and update business
        let categoriesArray = business.categories
        categoriesArray.push(addedCategory.data)
        
        const updatedBusiness = await axios.put('businesses', 
          {
            "businessId": business._id,
            "products": business.products,
            "categories": categoriesArray,
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

        setCategoryName("")
        
      }

    } catch (err) {
      console.log("there has been an error.")
    }    
  
    handleCategoryChange()
  }

  useEffect(() => {
    const loadCategory = async () => {
      try {
        if(category){
          setCategoryName(category.categoryName)
          setCategoryId(category._id)
        }

      } catch (err) {
        console.error(err.message)       
      }
      
    }
    loadCategory()
  }, [])

  return (
    <div>
     <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="categoryId">
        <Form.Control type="hidden" value={categoryId} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="categoryName">
        <Form.Label>Category Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter category name" 
          name="categoryName"
          value={categoryName} 
          onChange={handleInputChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default CategoryForm
