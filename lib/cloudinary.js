const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_API_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

module.exports = {
  upload: async function(file,filename) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(file,
        { public_id: filename },
        function(error, result) {
          if (error) {
            return reject(error)
          } else {
            let resultHandler = function (err) {
              if (err) {
                return reject(err)
              } else {
                return resolve(result)
              }
            }
            fs.unlink(file, resultHandler)
          }
        }
      )
    })
  }
}