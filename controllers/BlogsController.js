
const Blog = require('../models/Blog')
const base = require('./BaseController')
let BlogsController = {
  hi (req, res, next) {
    res.send('hi')
  }
}

module.exports = Object.assign(BlogsController, base(Blog, '博客'))
