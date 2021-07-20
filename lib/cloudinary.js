const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'sample', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

module.exports = {
  upload: function(file,filename) {
    cloudinary.v2.uploader.upload(file,
    { public_id: filename },
    function(error, result) {console.log(result); })
  }
}