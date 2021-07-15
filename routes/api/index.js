const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the API')
})

router.get('/users', (req, res) => {
  res.json(users)
})

module.exports = router