const express = require('express')
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

app.get('/', (req, res) => {
  const challenges = ['Hello world', 'Goodbye friend', 'Apple', 'Orange'];
  res.render('index', {
    page: {
      title: 'Real or 3D'
    },
    content: {
      challenges: challenges
    }
  });
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
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