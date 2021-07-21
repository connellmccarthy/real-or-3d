const sql = require('@sql')

module.exports = {
  challenges: {
    post: async function(challenge) {
      await sql.query({
        sql: "INSERT INTO `challenges` (uuid, image, title, slug, author, season, type, date_added, date_publish, date_close, description, url, outlet) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        values: [
          challenge.uuid,
          challenge.image,
          challenge.title,
          challenge.slug,
          challenge.author,
          challenge.season,
          challenge.type,
          challenge.date_added,
          challenge.date_publish,
          challenge.date_close,
          challenge.description,
          challenge.url,
          challenge.outlet
        ]
      })
    },
    get: async function() {
      const challenges = await sql.query({
        sql: "SELECT * FROM `challenges` ORDER BY date_added DESC"
      })
      return challenges
    }
  },
  users: {
    post: async function(user) {
      await sql.query({
        sql: "INSERT INTO `users` (uuid, username, slack_id, pin, date_joined, date_active, overall_challenges, overall_correct, overall_incorrect, overall_avg, overall_alg, season_challenges, season_correct, season_incorrect, season_avg, season_alg, votes_real, votes_3d) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        values: [
          user.uuid,
          user.username,
          user.slack_id,
          user.pin,
          user.date_joined,
          user.date_active,
          user.overall_challenges,
          user.overall_correct,
          user.overall_incorrect,
          user.overall_avg,
          user.overall_alg,
          user.season_challenges,
          user.season_correct,
          user.season_incorrect,
          user.season_avg,
          user.season_alg,
          user.votes_real,
          user.votes_3d
        ]
      })
    },
    get: async function() {
      const users = await sql.query({
        sql: "SELECT * FROM `challenges` ORDER BY season_alg DESC"
      })
      return users
    }
  },
  votes: {
    post: async function(vote) {
      await sql.query({
        sql: "INSERT INTO `votes` (uuid, user, challenge, date, date_change, season, value, correct) VALUES(?,?,?,?,?,?,?,?)",
        values: [
          vote.uuid,
          vote.user,
          vote.challenge,
          vote.date,
          vote.date_change,
          vote.season,
          vote.value,
          vote.correct
        ]
      })
    },
    get: async function(challenge_id) {
      const votes = await sql.query({
        sql: "SELECT * FROM `votes` WHERE challenge="+`${challenge_id}`
      })
      return votes
    }
  }
}