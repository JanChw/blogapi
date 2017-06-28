const mongoose = require('mongoose')
const Schema = mongoose.Schema

let BlogSchema = new Schema({
  title: String,
  body: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  meta: {
    like: {type: Number, default: 0},
    collection: {type: Number, default: 0}
  }
})

module.exports = mongoose.model('Blog', BlogSchema)
