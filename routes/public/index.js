const express = require('express')
const router = express.Router()
const sql = require('@sql')
const api = require('@api')

router.get('/', async (req, res) => {
  const users = ['@someone', '@someoneelse', '@tacos', '@pizza']
  const challenges = [
    {
      name: 'challenge-01',
      realOr3d: 'Real',
      votesReal: 5,
      votes3d: 7
    },
    {
      name: 'challenge-02',
      realOr3d: 'Real',
      votesReal: 7,
      votes3d: 5
    },
    {
      name: 'challenge-03',
      realOr3d: '3D',
      votesReal: 6,
      votes3d: 6
    },
    {
      name: 'challenge-04',
      realOr3d: '3D',
      votesReal: 2,
      votes3d: 10
    }
  ]
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
