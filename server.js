const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const validator = require('express-validator')
const fs = require('fs')
const {URL, validatorOption, corsOption} = require('./optionsConfig')
const api = require('./api/router')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(URL, () => {
  console.log('db connected successfully!')
})
let db = mongoose.connection

// bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// passport
app.use(passport.initialize())

// express-validator
app.use(validator(validatorOption))

// 配置cors
app.use(cors(corsOption))
db.on('error', () => {
  console.log('db connect failed!')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(api)

app.use((err, req, res, next) => {
  let writeStream = fs.createWriteStream('./logs/errors.js', {flags: 'a'})
  writeStream.write('=======================\n')
  writeStream.write(err.message)
  writeStream.end('\n')
  return res.status(500).json({data: null, error: '页面发生未知错误'})
})
app.use((req, res, next) => {
  return res.status(404).json({data: null, error: '404'})
})
app.listen(4000, () => {
  console.log('server starting on port 4000')
})
