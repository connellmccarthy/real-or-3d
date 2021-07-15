const sql = require('@sql')

exports.login = async function(req, res, next) {
  let username = req.body.username
  let password = req.body.password

  const verifyUser = await sql.query({
    sql: "SELECT `id` FROM `admin` WHERE `username`=? AND `password`=SHA2(?, 256)",
    values: [req.body.username, req.body.password]
  })
  if (verifyUser[0]) {
    req.session.admin_auth = true
    req.flash('successMessage', 'Logged in')
    next()
  } else {
    req.flash('errorMessage', 'Invalid login')
    res.redirect('/admin/login')
  }
}

exports.verify = function(req, res, next) {
  if (!req.session.admin_auth) {
    res.redirect('/admin/login')
  } else {
    next()
  }
}