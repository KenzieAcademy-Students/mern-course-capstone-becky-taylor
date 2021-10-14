import express from 'express'

const router = express.Router()
import { User, Business } from '../models'



//Getting all
router
.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

//Getting One
router.get('/:id', getUser, (req, res) => { 
  req.params.id
  res.json(res.user)
})

//Creating one
router.post('/', async (req, res)=>{
  const user = new User()
  try {
    const newUser = await user.save()
    
    res.status(201).json(newUser.toJSON())
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Add a business to the user's business array
router.put('/', async (req, res) => {
  const newBusiness = await Business.findById(req.body.business[0]._id)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: req.body.userId
      },
      {
        $push: { business: newBusiness }
      },
      {
        new: true
      }
    )
    res.json(updatedUser.toJSON())
  } catch (err) {
    res.status.apply(404).end()
  }
})

// Deleting User
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware
async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if(user === null) {
      return res.status(404).json({ message: 'Cannot find User' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = router
