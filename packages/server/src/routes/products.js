import { Product } from '../models'
import express from 'express'
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
  image
  categories
  */
  const { name, description, price, quantity } = request.body
  
  try {
    const product = new Product({
      productName: name,
      description: description,
      price: price,
      quantity: quantity
    })
    
    const savedProduct = await product.save()
    response.json(savedProduct.toJSON())
  } catch (error) {
    response.status(404).end()
  }
})

router.put('/:id', async (request, response) => {
  /* will need to add
  image
  categories
  */
  const { name, description, price, quantity } = request.body
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
        quantity: quantity
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
delete with authorization - kept this hear for future reference once we get auth set up
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
