var mysql = require('mysql')
var pool = mysql.createPool({
  connectionLimit: 1,
  connectTimeout: 60 * 60 * 1000,
  aquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

module.exports = {
  query: async function(query) {
    return new Promise(function(resolve, reject) {
      let results
      pool.getConnection(function(err, connection) {
        if (err) throw err
        connection.query(query, function(error, results, fields) {
          connection.release()
          if (error) throw error
          resolve(results)
        })
      })
    })
  },
  destroy: async function() {
    pool.destroy()
  }
}