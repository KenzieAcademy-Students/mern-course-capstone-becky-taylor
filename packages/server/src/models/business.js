import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const businessSchema = new mongoose.Schema({
    businessName: {
		type: String,
		required: true
    },
    businessURL: {
        type: String,
    },
    logo: {
        type: String
    },
    businessDescription: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String,
		required: true
    },
    stateZip: {
        type:Number,
		required: true
    },
    phone: {
        type: Number,
        required: true
    },
    brandColor: {
        type: String
    },
    products: [
        {
            type: ObjectId,
            ref: 'Product'
        }
    ],
    categories: [
        {
            type: ObjectId,
            ref: 'Category'
        }
    ]

})

const Business = mongoose.model('Business', businessSchema)

export default Business