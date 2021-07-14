const express = require('express')
const subdomain = require('express-subdomain')
const path = require('path')
var { Liquid } = require('liquidjs')
var engine = new Liquid({
  extname: '.liquid'
})
const app = express()
const port = normalizePort(process.env.PORT || 3000)
app.set('port', port)

app.engine('liquid', engine.express())
app.set('view engine', 'liquid');
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
  res.locals.site = {
    title: 'Real or 3D'
  }
  next()
})


//API
var apiRouter = require('./routes/api/index')
app.use(subdomain('api', apiRouter))

//Routes
var indexRouter = require('./routes/public/index')

//Handlers
app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Listening at http://real-or-3d.local:${port}`);
})

function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}