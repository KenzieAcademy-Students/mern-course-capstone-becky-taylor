import express from 'express'
const router = express.Router()
import { Business } from '../models'

router.get('/', async (request, response) => {
    console.log('Get businesses')
})

module.exports = router