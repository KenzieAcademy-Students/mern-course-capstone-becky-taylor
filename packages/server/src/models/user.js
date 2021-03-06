import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: false,
  },
  userType: {
    type: String,
  },
  business: [
    {
      type: ObjectId,
      ref: 'Business'
    }
  ]
})

const User = mongoose.model('User', userSchema)

export default User
