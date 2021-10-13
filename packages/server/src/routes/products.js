import { Product } from '../models'
import express from 'express'
import path from 'path'
import { requireAuth } from '../middleware'
const router = express.Router()


router.get('/', async (request, response) => {
  // this will get all products from the database
  try {
    const products = await Product.find({})

    response.json(products.map((product) => product.toJSON()))
    
  } catch (error) {
    response.status(404).end()
  }
})


// get product details by id
router.get('/:id', async (request, response) => {
  try {
    const product = await Product.findById(request.params.id)

    if (product) {
      response.json(product.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(404).end()
  }
})

router.post('/', requireAuth, async (request, response) => {
  /* will need to add
  categories
  */
  const { productName, productDescription, productPrice, productQuantity, productCategory, productImage } = request.body
  
  try {
    const product = new Product({
      productName: productName,
      description: productDescription,
      price: productPrice,
      quantity: productQuantity,
      image: productImage,
      category: productCategory
    })
    
    const savedProduct = await product.save()
    response.json(savedProduct.toJSON())
  } catch (error) {
    response.status(404).end()
  }
})

router.post('/upload-image', requireAuth, async (request, response) => {
  try {
      
      if(!request.files) {
          response.status(400).json({message: "No file uploaded."})
      } else {
          
          let productImageUpload = request.files.product_image_upload
          let businessPath = request.body.business_path
          let productID = request.body.product_id
          let timestamp = Date.now()

          
          const uploadPath = path.join(__dirname, '../../../client/') + 'public/images/products/' + businessPath + '/' + productID + '-' + timestamp + '-' + productImageUpload.name

          const uploadedFilePath = `/images/products/${businessPath}/${productID}-${timestamp}-${productImageUpload.name}`
          
          productImageUpload.mv(uploadPath, function(error) {            
            if (error) {
              return response.status(500).json({message: error})
            }
            response.status(200).json({filePath: uploadedFilePath})
          });          
      }
  } catch (error) {
      response.status(500).json({message: error})
  }
});

router.put('/:id', requireAuth, async (request, response) => {
  
  const { productName, productDescription, productPrice, productQuantity, productCategory, productImage } = request.body
  const productId = request.params.id

  try {
    const productUpdate = await Product.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        productName: productName,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity,
        category: productCategory,
        image: productImage
      },
      {
        new: true,
      }
    )
    response.json(productUpdate.toJSON())
  } catch (error) {
    response.status(404).end()
  }
})

/*
delete with authorization - kept this here for future reference once we get auth set up
router.delete('/:id', requireAuth, async (request, response) => {
*/
router.delete('/:id', requireAuth, async (request, response) => {
  
  const productId = request.params.id
  const product = await Product.findById(productId)

  if (!product) {
    return response.status(422).json({ error: 'Cannot find product' })
  }
  
  try {
    const removedProduct = await product.remove()

    response.json(removedProduct)
  } catch (error) {
    response.status(404).end()
  }
  
})

module.exports = router
