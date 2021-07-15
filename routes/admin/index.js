const express = require('express')
const router = express.Router()
const sql = require('@sql')
const {login, verify} = require('@auth')

router.post('/login', login, async (req, res) => {
  res.redirect('/admin')
})

router.get('/login', (req, res) => {
  res.render('admin/login', {
    page: {
      title: 'Admin',
      toast: req.flash()
    }
  })
})

router.use('/*', verify, (req, res, next) => {
  next()
})

router.get('/', (req, res) => {
  res.send('Authenticated!')
})

module.exports = router