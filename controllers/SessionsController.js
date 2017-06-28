const passport = require('passport')
// const User = require('../models/User')
const jwt = require('jsonwebtoken')
process.env.MYKEY = 'myblogapi'
module.exports = {
  login (req, res, next) {
    passport.authenticate('local', {session: false}, async (err, user, info) => {
      console.log(user)
      if (err) return next(err)
      if (!user) return res.json({data: null, error: '登陆失败(密码或用户名错误或未注册!)'})

      if (!user.isActived) return res.json({data: null, error: '您的账号尚未激活'})

      let {_id, isAdmin, name} = user
      let _user = {_id, isAdmin, name}
      let webtoken = jwt.sign(_user, process.env.MYKEY, {expiresIn: '24h'})
      res.set('authorization', `Bearer ${webtoken}`)
      return res.json({data: '成功登陆', error: null})
    })(req, res, next)
  },

  logout (req, res, next) {
    let webtoken = jwt.sign({}, process.env.MYKEY)
    res.set('authorization', `Bearer ${webtoken}`)
    return res.json({data: '成功登出', error: null})
  }
}
