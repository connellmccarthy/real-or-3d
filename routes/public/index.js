const express = require('express')
const router = express.Router()
const sql = require('@sql')
const api = require('@api')

router.get('/', async (req, res) => {
  const users = ['@someone', '@someoneelse', '@tacos', '@pizza']
  const challenges = await api.challenges.get()
  res.render('public/index', {
    page: {
      title: 'Leaderboard'
    },
    applications: {
      challenges: {
        content: challenges
      }
    }
  });
})

router.get('/challenges', async (req, res) => {
  const challenges = await api.challenges.get()
  res.render('public/windows/challenges', {
    applications: {
      challenges: {
        content: challenges
      }
    }
  })
})

module.exports = router
