const express = require('express')
const router = express.Router()
const sql = require('@sql')
const {login, verify} = require('@auth')
const cloudinary = require('@cloudinary')

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

router.post('/new', async (req, res) => {
  let slug = req.body.title
  slug = slug.replace(/\s+/g, '-').toLowerCase()
  const challenge = {
    image: req.body.image,
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
  cloudinary.upload(challenge.image, challenge.slug)
  console.log(challenge)
  req.flash('successMessage', 'Successfully created challenge')
  res.redirect('/admin')
})

router.get('/logout', (req, res) => {
  req.session.admin_auth = false
  res.redirect('/')
})

module.exports = router