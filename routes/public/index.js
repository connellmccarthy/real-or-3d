const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const challenges = ['Hello world', 'Goodbye friend', 'Apple', 'Orange'];
  res.render('index', {
    page: {
      title: 'Leaderboard'
    },
    content: {
      challenges: challenges
    }
  });
})

module.exports = router