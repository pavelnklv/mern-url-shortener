import { isEmailValid } from '../utils'

export const validateRegisterBody = async (req, res, next) => {
  const { email, password, comparePassword } = req.body

  const errors = {}
  if (!isEmailValid(email)) {
    errors.email = 'Invalid email'
  }
  if (!password || password.trim().length < 8) {
    errors.password = 'The password provided does not meet the security conditions'
  }
  if (password !== comparePassword) {
    errors.comparePassword = 'The passwords do not match'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors)
  }

  await next()
}
