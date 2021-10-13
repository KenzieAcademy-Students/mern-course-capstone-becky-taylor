import express from 'express'
import { requireAuth } from '../middleware'
const router = express.Router()
import { Business } from '../models'

router.get('/:businessId', async (req, res) => {
    const populateQuery = [
        { path: 'products' },
        { path: 'categories' }
      ]
    const business = await Business.findById(req.params.businessId)
        .populate(populateQuery)
        .exec()

    if (business) {
        res.json(business.toJSON())
    } else {
        res.status(404).end()
    }
})

router.get('/by-name/:businessURL', async (req, res) => {

    const populateQuery = [
        { path: 'products' },
        { path: 'categories' }
      ]
    const business = await Business.findOne({businessURL: req.params.businessURL})
        .populate(populateQuery)
        .exec()
    
    if (business) {
        res.json(business.toJSON())
    } else {
        res.status(404).end()
    }
})

router.put('/', requireAuth, async (req, res) => {
    try {
        const updatedBusiness = await Business.findByIdAndUpdate(
            {
                _id: req.body.businessId
            },
            {
                businessName: req.body.businessName,
                logo: req.body.logo,
                businessDescription: req.body.businessDescription,
                businessURL: req.body.businessURL,
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                stateZip: req.body.stateZip,
                phone: req.body.phone,
                brandColor: req.body.brandColor,
                products: req.body.products,
                categories: req.body.categories
            },
            {
                new: true
            }
        )
        res.json(updatedBusiness.toJSON())
    } catch (error) {
        console.log(error)
        res.status.apply(404).end()
    }
})

router.post('/', requireAuth, async (req, res) => {
    const business = new Business({
        businessName: req.body.businessName,
        businessURL: req.body.businessURL,
        businessDescription: req.body.businessDescription,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        stateZip: req.body.stateZip,
        phone: req.body.phone
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