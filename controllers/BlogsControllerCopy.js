const Blog = require('../models/Blog')
const BaseController = require('../controllers/BaseControllerCopy')
const User = require('../models/User')
class BlogsController extends BaseController {
  constructor (model) {
    super(model, '博客')
  }
  // addOne (req, res, next) {
  //   let self = this
  //   return (req, res, next) => {
  //     req.body.author = req.authUser._id
  //     self.model.create(req.body, (err, blog) => {
  //       if (err) return next(err)
  //       User.findById(blog.author, (err, user) => {
  //         if (err) return next(err)
  //         user.blogs.push(blog._id)
  //         user.save((err, data) => {
  //           if (err) return next(err)
  //           return res.json({ data: blog, error: null })
  //         })
  //       })
  //     })
  //   }
  // }
  addOne (req, res, next) {
    let self = this
    return async (req, res, next) => {
      try {
        req.body.author = req.authUser._id
        let blog = await self.model.create(req.body)
        let user = await User.findById(blog.author)
        user.blogs.push(blog._id)
        await user.save()
        return res.json({data: blog, error: null})
      } catch (err) {
        next(err)
      }
    }
  }

  // async pageninate (req, res, next) {
  //   try {
  //     let {page, limit} = req.query
  //     page = parseInt(page)
  //     limit = parseInt(limit)
  //     let blogs = Blog.find().skip((page - 1) * limit).limit(limit)
  //     return res.json({data: blogs, error: null})
  //   } catch (err) {
  //     next(err)
  //   }
  // }
}

module.exports = new BlogsController(Blog)
