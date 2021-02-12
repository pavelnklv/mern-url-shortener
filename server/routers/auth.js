import { hash } from 'bcryptjs'
import { json } from 'body-parser'
import { Router } from 'express'
import { validateRegisterBody } from '../middlewares/validators'
import authenticate from '../middlewares/authenticate'
import User from '../models/User'

const router = Router()

router.post('/register', json(), validateRegisterBody, async (req, res) => {
  const { email, password } = req.body

  const findUser = await User.findOne({ email })
  if (findUser) return res.status(400).end()

  const passwordHash = await hash(password, 12)

  const newUser = new User({ email, passwordHash })
  await newUser.save()

  const user = await User.findOne({ email })
    .select({ email: 1, createdAt: 1 })
  
  req.session.user = user

  res.status(201).json(user)
})

router.post('/login', json(), async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(401).end()

  req.session.user = user

  res.json(user)
})

router.post('/logout', async (req, res) => {
  req.session = null
  res.json({ message: 'ok' })
})

router.get('/me', authenticate, async (req, res) => {
  if (!req.isAuthenticated) return res.status(401).end()

  res.json(req.user)
})

export default router
