const sql = require('@sql')

module.exports = {
  challenges: {
    post: async function(challenge) {
      await sql.query({
        sql: 'INSERT INTO `challenges` (uuid, image, title, slug, author, season, type, date_added, date_publish, date_close, description, url, outlet) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
  }
}