const express = require('express')
const router = express.Router()
const sql = require('@sql')

router.get('/', async (req, res) => {
  const results = await sql.query({
    sql: 'SELECT ? + 1 AS solution',
    values: ['1']
  })
  if (results[0]) {
    console.log(`The solution is: ${results[0].solution}`)
  }

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