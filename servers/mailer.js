const nodeMailer = require('nodemailer')
module.exports = (user, action, next) => {
  let transporter = nodeMailer.createTransport('smtps://janchw@qq.com:blpaajdsyynpdaab@smtp.qq.com')

  let mailOptions = {
    from: 'janchw@qq.com',
    to: `${user.email}`,
    subject: '账号激活',
    html: `<b><a href='http://localhost:4000/account/${action}/${encodeURIComponent(user.token)}'>点此链接激活</a></b>`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) next(err)
    return console.log(info)
  })
}
