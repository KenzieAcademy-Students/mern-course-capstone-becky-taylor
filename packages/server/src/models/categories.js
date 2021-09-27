import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const categoriesSchema = new mongoose.Schema ({
    categoryName: {
        type: String,
        unique: true,
        required: true
    },
    categoryId: {
        type: String,
        unique: true,
        required: true
    }  
})