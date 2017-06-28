const User = require('../models/User')
const bcrypt = require('bcrypt')
const sendMail = require('../servers/mailer')
module.exports = {
  async registe (req, res, next) {
    try {
      // user validator
      req.checkBody('name', '姓名不能为空且字符长度不能小于6大于20').notEmpty().len(6, 20)
      req.checkBody('email', '邮箱不能为空且格式要正确').notEmpty().isEmail()
      req.checkBody('password', '密码不能为空且长度不能小于6').len(6)
      req.checkBody('password_confirmation', '密码不一致').equals(req.body.password)

      let result = await req.getValidationResult()
      if (result.isEmpty()) {
        let token = await bcrypt.hash(Date.now() + '', 10)
        let {name, email, password} = req.body

        let existUser = await User.findOne({email})
        if (existUser) return res.json({data: null, error: '邮箱已注册'})

        let user = await User.create({name, email, password, token})
        sendMail(user, 'activeuser', next)
        return res.json({data: user, error: null})
      }
      result.array().splice(1, 2)
      return res.json({data: null, error: result.array()})
    } catch (err) {
      next(err)
    }
  },

  async acitveUser (req, res, next) {
    try {
      let token = req.params.token

      let user = await User.findOne({token})
      if (!user) return res.json({data: null, error: '激活失败'})

      user.isActived = true
      await user.save()
      return res.json({data: '激活成功', error: null})
    } catch (err) {
      next(err)
    }
  },

  async forgetPwd (req, res, next) {
    try {
      let token = await bcrypt.hash(Date.now() + '', 10)
      await User.findByIdAndUpdate(req.authUser._id, {token})
      return res.json({data: token, error: null})
    } catch (err) {
      next(err)
    }
  },

  async resetPwd (req, res, next) {
    try {
      let token = req.params.token
      let user = await User.findOne({token})
      if (!user) return res.json({data: null, error: '密码重设失败'})
      user.password = req.body.password
      await user.save()
      return res.json({data: '密码重设成功', error: null})
    } catch (err) {
      next(err)
    }
  },

  async updateUserInfo (req, res, next) {
    try {
      let user = await User.findByIdAndUpdate(req.authUser._id, {meta: req.body})
      return res.json({data: user, error: null})
    } catch (err) {
      next(err)
    }
  },

  async myAllBlogs (req, res, next) {
    try {
      let user = await User.findById(req.authUser._id).populate('blogs')
      return res.json({data: user.blogs, error: null})
    } catch (err) {
      next(err)
    }
  }
}
