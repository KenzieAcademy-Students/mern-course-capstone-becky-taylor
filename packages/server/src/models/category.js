import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const categorySchema = new mongoose.Schema ({
    categoryName: {
        type: String,
        unique: true,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema)

export default Category