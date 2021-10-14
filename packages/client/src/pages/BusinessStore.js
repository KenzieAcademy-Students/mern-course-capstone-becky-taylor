import React, { useState, useEffect } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import axios from 'util/axiosConfig.js'
import { useProvideAuth } from 'hooks/useAuth'
import BusinessInfo from 'components/BusinessInfo'
import Category from 'components/Category'
import ProductForm from 'components/ProductForm'
import CategoryForm from 'components/CategoryForm'

export default function BusinessStore(props) {
  const [error, setError] = useState("")
  const { state, getCurrentUser } = useProvideAuth()
  const [loggedIn, setLoggedIn] = useState(false)
  const [businessURL, setBusinessURL] = useState(props.match.params.businessURL)
  const [businessObj, setBusinessObj] = useState({})
  const [products, setProducts] = useState([])  
  const [editShow, setEditShow] = useState(false)
  const [delShow, setDelShow] = useState(false)
  const [currentProduct, setCurrentProduct] = useState("")
  const [categories, setCategories] = useState([])
  const [editShowCat, setEditShowCat] = useState(false)
  const [delShowCat, setDelShowCat] = useState(false)
  const [currentCategory, setCurrentCategory] = useState("")
  const [refreshList, setRefreshList] = useState(false)
  

  const handleShowEditModal = (editProduct) => {
    setCurrentProduct(editProduct)
    setEditShow(true)
  }

  const handleBusinessChange = async () => {
    setRefreshList(true)
  }

  const handleShowDelModal = (deleteProduct) => {
    setCurrentProduct(deleteProduct)
    setDelShow(true)
  }

  const handleProductChange = async () => {
    setRefreshList(true)
    setEditShow(false)
  }

  const handleShowEditModalCat = (editCategory) => {
    setCurrentCategory(editCategory)
    setEditShowCat(true)
  }

  const handleShowDelModalCat = (deleteCategory) => {
    setCurrentCategory(deleteCategory)
    setDelShowCat(true)
  }

  const handleCategoryChange = async () => {
    setRefreshList(true)
    setEditShowCat(false)
  }

  const handleDelete = async () => {
    
    try {

      // remove deleted product from business products array and update business
      let productsArray = businessObj.products
      let foundIndex = -1
      productsArray.forEach((product, productIndex) => {
        if(product._id === currentProduct._id){
          foundIndex=productIndex
        }
      })
      if(foundIndex > -1){
        productsArray.splice(foundIndex, 1)
      }
      
      const updatedBusiness = await axios.put('businesses', 
        {
          "businessId": businessObj._id,
          "products": productsArray,
          "categories": businessObj.categories,
          "businessName": businessObj.businessName,
          "logo": businessObj.logo,
          "businessDescription": businessObj.businessDescription,
          "businessURL": businessObj.businessURL,
          "brandColor": businessObj.brandColor,
          "address1": businessObj.address1,
          "address2": businessObj.address2,
          "city": businessObj.city,
          "stateZip": businessObj.stateZip,
          "phone": businessObj.phone })

      const deleteProduct = await axios.delete(`products/${currentProduct._id}`)

      setRefreshList(true)
      setDelShow(false)

    } catch (err) {
      console.log("there has been an error: ", err)
    }    
  }

  const handleDeleteCat = async () => {
    
    try {

      // remove deleted category from business categories array and update business
      let categoriesArray = businessObj.categories
      let foundIndex = -1
      categoriesArray.forEach((category, categoryIndex) => {
        if(category._id === currentCategory._id){
          foundIndex=categoryIndex
        }
      })
      if(foundIndex > -1){
        categoriesArray.splice(foundIndex, 1)
      }
      
      const updatedBusiness = await axios.put('businesses', 
        {
          "businessId": businessObj._id,
          "products": businessObj.products,
          "categories": categoriesArray,
          "businessName": businessObj.businessName,
          "logo": businessObj.logo,
          "businessDescription": businessObj.businessDescription,
          "businessURL": businessObj.businessURL,
          "brandColor": businessObj.brandColor,
          "address1": businessObj.address1,
          "address2": businessObj.address2,
          "city": businessObj.city,
          "stateZip": businessObj.stateZip,
          "phone": businessObj.phone })

      const deleteCategory = await axios.delete(`categories/${currentCategory._id}`)

      setRefreshList(true)
      setDelShowCat(false)

    } catch (err) {
      console.log("there has been an error: ", err)
    }    
  }

  useEffect(() => {
    
    const getBusiness = async () => {
      try {
        
        const businessFound = await axios.get(`businesses/by-name/${businessURL}`)
        
        setBusinessObj(businessFound.data)
        setProducts([...businessFound.data.products])
       
        let categoriesWithProducts = [];
        
        businessFound.data.categories.forEach((category) => {

          let categoryObj = {
            categoryName: category.categoryName,
            _id: category._id,
            products: []
          }

          businessFound.data.products.forEach((product) => {
            if(product.category === category._id){
              categoryObj.products.push(product)
            }
          })

          categoriesWithProducts.push(categoryObj)

        })

        // Finally, add a category for products with no category selected
        let blankCategoryObj = {
          categoryName: "Products without a category",
          _id: "0",
          products: []
        }
        businessFound.data.products.forEach((product) => {
          
          if(product["category"] == undefined){
            blankCategoryObj.products.push(product)
          }
        })
        categoriesWithProducts.push(blankCategoryObj)
        
        setCategories([...categoriesWithProducts])
        setLoggedIn(state.isAuthenticated)
        setRefreshList(false)
        
      } catch (err) {
        console.error(err.message)
        setError(err)
      }
    }
    getBusiness()
    
  }, [state, refreshList])

  return (
    <div>
      <BusinessInfo businessObj={businessObj} handleBusinessChange={handleBusinessChange} loggedIn={loggedIn} />
      
      { categories && (
        <div>{categories.map((category) => (
          <Category key={category._id} category={category} products={category.products} loggedIn={loggedIn} handleShowEditModalCat={handleShowEditModalCat} handleShowDelModalCat={handleShowDelModalCat} handleShowEditModal={handleShowEditModal} handleShowDelModal={handleShowDelModal} />
        ))}</div>
      )}
      
      {loggedIn && (
      <Card style={{ width: '60rem', border: '0px' }}>
        <Card.Body>
          <Button variant="success" onClick={() => handleShowEditModalCat([])} 
              key={"new_category"}>Add New Category</Button> <Button variant="success" onClick={() => handleShowEditModal([])} key={"new_product"}>Add New Product</Button>                   
        </Card.Body>
      </Card> )
      }

      <Modal size="lg" show={editShow}
        onHide={() => setEditShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><ProductForm business={businessObj} product={currentProduct} handleProductChange={handleProductChange} /></Modal.Body>
      </Modal>

      <Modal size="lg" show={delShow}
        onHide={() => setDelShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the following product? {currentProduct.productName}</p>
          <Button variant="success" onClick={handleDelete}>Yes</Button> <Button variant="danger" onClick={() => {setDelShow(false)}}>No</Button>
        </Modal.Body>
      </Modal>

      <Modal size="lg" show={editShowCat}
        onHide={() => setEditShowCat(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Edit Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><CategoryForm business={businessObj} category={currentCategory} handleCategoryChange={handleCategoryChange} /></Modal.Body>
      </Modal>

      <Modal size="lg" show={delShowCat}
        onHide={() => setDelShowCat(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the following category? {currentCategory.categoryName}</p>
          <Button variant="success" onClick={handleDeleteCat}>Yes</Button> <Button variant="danger" onClick={() => {setDelShowCat(false)}}>No</Button>
        </Modal.Body>
      </Modal>

    </div>
  )
}
