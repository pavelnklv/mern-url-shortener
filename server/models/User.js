import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  passwordHash: String
}, { timestamps: true })

export default model('User', userSchema)
