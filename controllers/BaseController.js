
module.exports = function (model, modelName, error = null) {
  return {
    getAll (req, res, next) {
      model.find((err, data) => {
        if (err) return next(err)
        res.json({ data, error })
      })
    },

    getOne (req, res, next) {
      model.findById(req.params.id, (err, data) => {
        if (err) return next(err)
        if (!data) return res.json({ data, error: `${modelName}不存在！` })
        return res.json({ data, error })
      })
    },

    addOne (req, res, next) {
      model.create(req.body).then((err, data) => {
        if (err) return next(err)
        return res.json({ data, error })
      })
    },

    updateOne (req, res, next) {
      model.findByIdAndUpdate(req.params.id, (err, data) => {
        if (err) return next(err)
        if (!data) return res.json({ data, error: `${modelName}不存在！` })
        return res.json({ data, error })
      })
    },

    removeOne (req, res, next) {
      model.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return next(err)
        if (!data) return res.json({ data, error: `${modelName}不存在！` })
        return res.json({ data, error })
      })
    }
  }
}
