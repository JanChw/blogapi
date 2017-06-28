const validatorOption = {
  errorFormatter: function (param, msg, value) {
    let namespace = param.split('.')
    let root = namespace.shift()
    let formParam = root
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}

const corsOption = {
  origin: ['http://localhost:1212'],
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200
}
const URL = 'mongodb://localhost/blogapi'

module.exports = {validatorOption, corsOption, URL}
