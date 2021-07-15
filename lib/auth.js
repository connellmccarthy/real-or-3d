const sql = require('@sql')

exports.verify = function(req, res, next) {
  if (!req.session.admin_auth) {
    res.redirect('/admin/login')
  } else {
    next()
  }
}