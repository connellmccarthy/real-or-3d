const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the API')
})

router.get('/users', (req, res) => {
  res.json([{
    name: 'Connell',
    pin: '2612'
  }])
})

module.exports = router