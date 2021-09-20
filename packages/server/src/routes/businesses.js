import express from 'express'
const router = express.Router()
import { Business } from '../models'

router.get('/:businessId', async (req, res) => {
    const business = await Business.findById(req.params.businessId)

    if (business) {
        res.json(business.toJSON())
    } else {
        res.status(404).end()
    }
})

router.post('/', async (req, res) => {
    const business = new Business({
        businessName: req.body.name
    })
    console.log(business)
    try {
        const newBusiness = await business.save()
        res.status(200).json(newBusiness.toJSON())
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router