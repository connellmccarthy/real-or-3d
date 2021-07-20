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

function crypt(x) {
  var dt = new Date().getTime();
  return x.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
}

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
  },
  create_UUID: async function(l, table){
    let uuid = crypt(l)
    const results = await this.query({
      sql: `SELECT * FROM ${table} WHERE uuid=? LIMIT 1`,
      values: [uuid]
    })
    if (results[0]) {
      console.log('Already exists, create another')
      this.create_UUID(l, table)
    } else {
      return uuid
    }

  }
}