var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const router = require('./routes/gamesRouter')(express)
const port = 8000


app.set('view engine', 'hbs')

// accept json middleware
app.use(function(req, res, next){

  if (req.accepts('json')) {
    // Allow JSON files
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    
    next()
    return
  }
  // Only accepting JSON Files
  res.status(400).send('This app only accepts json-files')
})

app.use( bodyParser.json() )    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

// use routes defined in routes file
app.use('/games', router)

// Listen to port
app.listen(port, () => console.log(`Rest API listening on port ${port}!`))