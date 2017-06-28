
class BaseController {
  constructor (model, modelName) {
    this.model = model
    this.modelName = modelName
    this.error = null
  }
  getAllOrSome (req, res, next) {
    let self = this
    return (req, res, next) => {
      if (req.query.page && req.query.limit) {
        let {page, limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        self.model.find().skip((page - 1) * limit).limit(limit).then((err, blogs) => {
          if (err) return next(err)
          return res.json({data: blogs, error: null})
        })
      } else {
        self.model.find((err, data) => {
          if (err) return next(err)
          return res.json({ data, error: self.error })
        })
      }
    }
  }

  getOne (req, res, next) {
    let self = this
    return (req, res, next) => {
      self.model.findById(req.params.id, (err, data) => {
        if (err) return next(err)
        if (!data) return res.json({ data, error: `此${self.modelName}不存在！` })
        return res.json({ data, error: self.error })
      })
    }
  }

  addOne (req, res, next) {
    let self = this
    return (req, res, next) => {
      self.model.create(req.body, (err, data) => {
        if (err) return next(err)
        return res.json({ data, error: self.error })
      })
    }
  }

  updateOne (req, res, next) {
    let self = this
    return (req, res, next) => {
      self.model.findByIdAndUpdate(req.params.id, (err, data) => {
        if (err) return next(err)
        if (!data) return res.json({ data, error: `此${self.modelName}不存在！` })
        return res.json({ data, error: self.error })
      })
    }
  }

  removeOne (req, res, next) {
    let self = this
    return (req, res, next) => {
      self.model.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return next(err)
        if (!data) return res.json({ data, error: `此${self.modelName}不存在！` })
        return res.json({ data, error: self.error })
      })
    }
  }
}

module.exports = BaseController
