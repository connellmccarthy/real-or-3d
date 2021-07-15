require('dotenv').config()
require('module-alias/register')
const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
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

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000* 60 * 60 * 24 * 365
  }
}))


// Get site config
const fs = require('fs')
const yaml = require('js-yaml')
var data

try {
  let fileContents = fs.readFileSync('data/config.yaml', 'utf8')
  data = yaml.load(fileContents)
} catch (e) {
  console.log(e)
}

app.use((req, res, next) => {
  res.locals.site = data.site
  next()
})

//API
var sql = require('@sql')
var apiRouter = require('./routes/api/index')
app.use('/api/', apiRouter)

//Admin
var adminRouter = require('./routes/admin/index')
app.use('/admin', adminRouter)

//Routes
var indexRouter = require('./routes/public/index')
const { config } = require('dotenv')

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

// Garbage collection
function cleanup() {
  sql.destroy();
  process.exit();
}

if (app.get('env') === 'production') {
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  // function cleanup() {
  //   redisClient.quit(function() {
  //       console.log('Redis client stopped.');
  //       sql.destroy();
  //       process.exit();
  //   });
  // };
} else {
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}
