const express = require('express')
var { Liquid } = require('liquidjs')
var engine = new Liquid({
  extname: '.liquid'
})
const app = express()
const port = 3000

app.engine('liquid', engine.express())
app.set('view engine', 'liquid');

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