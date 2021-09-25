import express from 'express'
import productRouter from './products'
import usersRouter from './users'
import businessRouter from './businesses'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.use('/users', usersRouter)
router.use('/products', productRouter)
router.use('/businesses', businessRouter)

module.exports = router
