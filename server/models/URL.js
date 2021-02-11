import { model, Schema } from 'mongoose';

const urlSchema = new Schema({
  name: String,
  long: String,
  short: {
    type: String,
    unique: true,
  },
  clicks: [{
    browser: String,
    os: String,
    country: String,
    source: String,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })

export default model('URL', urlSchema)
