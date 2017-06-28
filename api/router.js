const express = require('express')
const router = express.Router()
const passport = require('passport')
const unless = require('express-unless')
require('../servers/passportcopy')(passport)

// const BlogsController = require('../controllers/BlogsController')
const BlogsController = require('../controllers/BlogsControllerCopy')
const UsersController = require('../controllers/UsersController')
const SessionsController = require('../controllers/SessionsController')

const isAuthorized = require('../middlewares/isAuthorized')
const isBlogOwnerOrAdmin = require('../middlewares/isOwnerOrAdmin')
isAuthorized.unless = unless

const isIdLegal = require('../middlewares/isIdLegal')

// router.use(isAuthorized.unless({
//   path: [
//         {url: '/blogs', methods: ['GET']},
//         {url: /\/blogs\/.*/, methods: ['GET']},
//         {url: '/account/registe', methods: ['POST']},
//         {url: /\/account\/activeuser\/.*/, methods: ['GET']},
//         {url: '/login', methods: ['POST']},
//         {url: '/logout', methods: ['GET']} ]
// }))
router.param('id', isIdLegal)
router.use('/api', (req, res, next) => {
  res.send('welcome to my app')
})

// resources blogs
router.route('/blogs')
      .get(BlogsController.getAllOrSome())
      .all(isAuthorized)
      .post(BlogsController.addOne())

router.route('/blogs/:id')
      .get(BlogsController.getOne())
      .all(isAuthorized, isBlogOwnerOrAdmin)
      .patch(BlogsController.updateOne())
      .delete(BlogsController.removeOne())

// resources users
router.post('/account/registe', UsersController.registe)
      .get('/account/activeuser/:token', UsersController.acitveUser)
      .use(['/account', '/me'], isAuthorized)
      .get('/account/forgetpwd', UsersController.forgetPwd)
      .patch('/account/resetpwd/:token', UsersController.resetPwd)
      .patch('/account/updateinfo', UsersController.updateUserInfo)
      .get('/me/blogs', UsersController.myAllBlogs)

// user sessions
router.post('/login', SessionsController.login)
      .get('/logout', SessionsController.logout)

module.exports = router
