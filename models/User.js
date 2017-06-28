const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}],
  isAdmin: {type: Boolean, default: false},
  isActived: {type: Boolean, default: false},
  activeExpires: {type: Date, default: (Date.now() + 24 * 60 * 60 * 1000)},
  token: String,
  meta: {
    desc: String,
    address: String,
    hobbies: [String],
    socials: [String]
  }
})

module.exports = mongoose.model('User', UserSchema)
