import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const businessSchema = new mongoose.Schema({
    businessName: {
		type: String,
		unique: true,
		required: true,
    },
    logo: {
        type: String,
    },
    businessDescription: {
        type: String,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    stateZip: {
        type:Number,
    },
    phone: {
        type: Number,
    },
    brandColor: {
        type: String,
    },
    products: [
        {
            type: ObjectId,
            ref: 'Product',
        },
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