const mongoose = require('mongoose')
let url = "mongodb://localhost:27017/test"

// Connect to Database mongoose
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) throw err
})

let projectModel = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  _links: JSON

}, { collection: 'games' })

module.exports = mongoose.model('games', projectModel)