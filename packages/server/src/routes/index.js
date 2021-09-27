import express from 'express'
import productRouter from './products'
import usersRouter from './users'
import businessRouter from './businesses'
import categoryRouter from './categories'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.use('/users', usersRouter)
router.use('/products', productRouter)
router.use('/businesses', businessRouter)
router.use('/categories', categoryRouter)

module.exports = router
