const express = require('express')
const router = express.Router()
const sql = require('@sql')
const {login, verify} = require('@auth')
const cloudinary = require('@cloudinary')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const api = require('@api')

router.post('/login', login, async (req, res) => {
  res.redirect('/admin')
})
router.get('/login', async (req, res) => {
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

router.get('/', async (req, res) => {
  const challenges = await api.challenges.get()

  res.render('admin/index',  {
    page: {
      title: 'Dashboard',
      toast: req.flash(),
      challenges: challenges
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
  let uuid = await sql.create_UUID('xxxx-xxxx', 'challenges')
  slug = uuid + '-' + slug

  let type;
  if (req.body.type == 'real') {
    type = true;
  } else if (req.body.type == '3D') {
    type = false;
  }

  let outlet;
  if (req.body.outlet) {
    outlet = true;
  } else {
    outlet = false;
  }

  const challenge = {
    uuid: uuid,
    image: req.files.image.path,
    title: req.body.title,
    slug: slug,
    author: req.body.author,
    season: req.body.season,
    type: type,
    date_added: new Date(),
    date_publish: req.body.date_publish,
    date_close: req.body.date_close,
    description: req.body.description,
    url: req.body.url,
    outlet: outlet
  }

  var cloud_image = await cloudinary.upload(challenge.image, challenge.slug)
  if (cloud_image) {
    challenge.image = cloud_image.url
  }
  api.challenges.post(challenge)

  req.flash('successMessage', 'Successfully created challenge')
  res.redirect('/admin')
})

router.get('/logout', (req, res) => {
  req.session.admin_auth = false
  res.redirect('/')
})

module.exports = router