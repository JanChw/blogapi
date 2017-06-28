const Blog = require('../models/Blog')
function ownerOrAdmin (model) {
  return (req, res, next) => {
    let isOwner = model.author === req.authUser._id
    let isAdmin = req.authUser.isAdmin
    if (isOwner || isAdmin) return next()
    return res.json({data: null, error: '您无权进行此操作'})
  }
}

module.exports = ownerOrAdmin(Blog)
