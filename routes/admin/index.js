const express = require('express')
const router = express.Router()
const sql = require('@sql')
const {login, verify} = require('@auth')
const cloudinary = require('@cloudinary')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const fs = require('fs')

router.post('/login', login, async (req, res) => {
  res.redirect('/admin')
})
router.get('/login', (req, res) => {
  res.render('admin/login', {
    page: {
      title: 'Login',
      toast: req.flash()
    }
  })
})

router.use('/*', verify, (req, res, next) => {
  next()
})

router.get('/', (req, res) => {
  res.render('admin/index',  {
    page: {
      title: 'Dashboard',
      toast: req.flash()
    }
  })
})

router.get('/new', (req, res) => {
  res.render('admin/new', {
    page: {
      title: "New challenge",
      toast: req.flash()
    }
  })
})

router.post('/new', multipartMiddleware, async (req, res) => {
  let slug = req.body.title
  slug = slug.replace(/\s+/g, '-').toLowerCase()
  const challenge = {
    image: req.files.image.path,
    title: req.body.title,
    slug: slug,
    author: req.body.author,
    season: req.body.season,
    type: req.body.type,
    date_post: new Date(),
    date_open: req.body.date_open,
    date_close: req.body.date_close,
    description: req.body.description,
    outlet: req.body.outlet
  }
  await cloudinary.upload(challenge.image, challenge.slug)
  
  console.log(challenge)
  let resultHandler = function (err) {
    if (err) {
      console.log('unlink failed', err)
    } else {
      console.log('file deleted')
    }
  }
  fs.unlink(challenge.image, resultHandler)

  req.flash('successMessage', 'Successfully created challenge')
  res.redirect('/admin')
})

router.get('/logout', (req, res) => {
  req.session.admin_auth = false
  res.redirect('/')
})

module.exports = router