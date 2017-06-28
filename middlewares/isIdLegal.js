
const mongoose = require('mongoose')
module.exports = function (req, res, next, id) {
  let isValidId = mongoose.Types.ObjectId.isValid(id)
  if (!isValidId) return res.json({data: null, error: '此id不存在！'})
  return next()
}
