import express from 'express'
import productRouter from './products'


const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.use('/products', productRouter)

module.exports = router
