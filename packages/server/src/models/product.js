import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
    productName: {
            type: String,
            required: true
    },
    productId: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    categories: [
        {
            type: ObjectId,
            ref: 'Category'
        }
    ]
    })
    

const Product = mongoose.model('Product', productSchema)

export default Product