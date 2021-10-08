import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String
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
    category: {
        type: String
    }
    },
    { timestamps: true }
)
    

const Product = mongoose.model('Product', productSchema)

export default Product