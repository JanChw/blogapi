const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = (passport) => {
// passport常规登陆处理
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      console.log(username, password)
      let user = await User.findOne({email: username, password})
      console.log(user)
      if (!user) return done(null, false)
      return done(null, user)
    } catch (err) {
      done(err)
    }
  }))
}
