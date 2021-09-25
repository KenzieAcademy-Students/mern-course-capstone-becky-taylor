import express from 'express'

const router = express.Router()
import { User } from '../models'



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
  const user = new User({
    name: req.body.name,
    email: req.body.email
  })
  try {
    const newUser = await user.save()
    
    res.status(201).json(newUser.toJSON())
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating User
router.put('/:id', getUser, async (req, res) => {
 if (req.body.name !== null) {
   res.id.name = req.body.name
 }
 if (req.body.email !== null) {
  res.id.email = req.body.email
 }
 try {
   const updatedUser = await res.id.save()
   res.json(updatedUser)
 } catch (err) {
   res.status(400).json({ message: err.message })
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
