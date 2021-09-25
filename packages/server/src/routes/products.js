import { Product } from '../models'
import express from 'express'
import path from 'path'
const router = express.Router()


router.get('/', async (request, response) => {
  // this will get all products from the database
  try {
    const products = await Product.find({})

    response.json(products.map((products) => products.toJSON()))
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

router.post('/', async (request, response) => {
  /* will need to add
  categories
  */
  const { name, description, price, quantity, productImage } = request.body
  
  try {
    const product = new Product({
      productName: name,
      description: description,
      price: price,
      quantity: quantity,
      productImage: productImage,
    })
    
    const savedProduct = await product.save()
    response.json(savedProduct.toJSON())
  } catch (error) {
    response.status(404).end()
  }
})

router.post('/upload-image', async (request, response) => {
  try {
      
      if(!request.files) {
          response.status(400).json({message: "No file uploaded."})
      } else {
          
          let productImageUpload = request.files.product_image_upload
          
          const uploadPath = path.join(__dirname, '../../../client/') + 'public/images/products/' + productImageUpload.name
          
          productImageUpload.mv(uploadPath, function(error) {            
            if (error) {
              return response.status(500).json({message: error})
            }
            response.status(200).json({filePath: `/images/products/${productImageUpload.name}`})
          });          
      }
  } catch (error) {
      console.dir(error)
      response.status(500).json({message: error})
  }
});

router.put('/:id', async (request, response) => {
  /* will need to add
  categories
  */
  const { name, description, price, quantity, productImage } = request.body
  const productId = request.params.id

  try {
    const productUpdate = await Product.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        productImage: productImage
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
router.delete('/:id', async (request, response) => {
  
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
