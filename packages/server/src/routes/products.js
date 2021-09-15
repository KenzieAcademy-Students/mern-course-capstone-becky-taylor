import express from 'express'
const router = express.Router()
import { Product } from '../models'

/* Routes needed:
GET /products/<business-id> - Returns the list of products for a specific business
GET /products/<product-id> - returns the details of a specific product/menu item
GET /products/search/<search-term> - returns the list of products matching the search term
PUT /products/<product-id> - updates product data for a specific product
POST /products/<business-id> - inserts a new product for a specific business
*/
router.get('/', async (request, response) => {
  console.log('get products')
})

module.exports = router
