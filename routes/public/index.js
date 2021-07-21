const express = require('express')
const router = express.Router()
const sql = require('@sql')
const api = require('@api')

router.get('/', async (req, res) => {
  const users = ['@someone', '@someoneelse', '@tacos', '@pizza']
  const challenges = await api.challenges.get()
  res.render('public/index', {
    page: {
      leaderboard: {
        title: 'Leaderboard',
        users: users
      },
      challenges: {
        title: 'Challenges',
        challenges: challenges
      }
    }
  });
})

module.exports = router
