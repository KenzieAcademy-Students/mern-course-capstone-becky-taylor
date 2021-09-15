import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  email:{ 
    type: String,
    unique: true,
    required: true,
    },
    passwordHash:{
    type: String,
    required:true,
    },
    userType:{
      type: String,
    },
})

const User = mongoose.model('User', userSchema)

export default User
