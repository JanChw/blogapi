const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = (passport) => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      console.log(username, password)
      let user = await User.findOne({name: username})
      console.log(user)
      if (!user) done(null, false)
      done(null, user)
    } catch (err) {
      done(err)
    }
  }))
}
