const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
  try {
    let auth = req.headers.authorization
    if (!auth) {
      return res.status(403).json({data: null, error: '您未登陆'})
    }
    let webtoken = auth.split(' ').pop()
    console.log(webtoken)
    let authUser = await jwt.verify(webtoken, process.env.MYKEY)
    if (!authUser) return res.status(403).json({data: null, error: '您登陆失败！'})
    req.authUser = authUser
    next()
  } catch (err) {
    next(err)
  }
}
