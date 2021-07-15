const express = require('express')
const router = express.Router()
const sql = require('@sql')
const {verify} = require('@auth')

router.post('/login', async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  const verifyUser = await sql.query({
    sql: "SELECT `id` FROM `admin` WHERE `username`=? AND `password`=SHA2(?, 256)",
    values: [req.body.username, req.body.password]
  })
  if (verifyUser[0]) {
    console.log('Authenticated!')
    req.session.admin_auth = true
    res.redirect('/admin')
  } else {
    console.log('Not found')
    res.redirect('/admin/login')
  }
})

router.get('/login', (req, res) => {
  res.render('admin/login')
  console.log(req.session.admin_auth)
})

router.get('/', verify, (req, res) => {
  res.send('Authenticated!')
})

module.exports = router