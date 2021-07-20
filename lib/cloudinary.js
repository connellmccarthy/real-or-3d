const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'sample', 
  api_key: '874837483274837', 
  api_secret: 'a676b67565c6767a6767d6767f676fe1' 
});

module.exports = {
  upload: function(file,filename) {
    cloudinary.v2.uploader.upload(file,
    { public_id: filename },
    function(error, result) {console.log(result); })
  }
}