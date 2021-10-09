import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'
import keys from '../config/keys'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.route('/').get((req, res, next) => {
  res.send('auth endpoint')
})

router.post('/signup', async (req, res) => {
  const { name, password, email } = req.body
  
  if (!password || !name || !email) {
    return res.status(422).json({ error: 'please add all the fields' })
  }

  if (password.length < 8 || password.length > 20){
    return res.status(400).json({ error: 'Password must be between 8 and 20 characters long.' })
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'user already exists with that email address' })
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          name,
          passwordHash: hashedpassword,
          email: email,
        })

        user
          .save()
          .then((user) => {
            res.json({ message: 'saved successfully' })
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({ error: 'missing email address or password' })
  }

  const user = await User.findOne({ email: email })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, keys.jwt.secret)
  res
    .status(200)
    .send({ token, email, uid: user.id })
})

module.exports = router
