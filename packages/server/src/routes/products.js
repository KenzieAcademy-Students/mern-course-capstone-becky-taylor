import express from 'express'
const router = express.Router()
import { Product } from '../models'

router.get('/', async (request, response) => {
  console.log('get products')
})

module.exports = router
