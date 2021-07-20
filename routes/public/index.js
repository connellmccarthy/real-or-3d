const express = require('express')
const router = express.Router()
const sql = require('@sql')
const api = require('@api')

router.get('/', async (req, res) => {
  const users = ['@someone', '@someoneelse', '@tacos', '@pizza']
  res.render('public/index', {
    page: {
      title: 'Leaderboard',
      users: users
    }
  });
})

router.get('/challenges', async (req, res) => {
  const challenges = await api.challenges.get()
  res.render('public/challenges', {
    page: {
      title: 'Challenges',
      challenges: challenges
    }
  });
})

module.exports = router