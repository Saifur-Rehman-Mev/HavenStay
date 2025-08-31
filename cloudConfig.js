const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_CLOUD_KEY,
    api_secret : process.env.API_CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'heavenstay_DEV',
    allowedFormat : ["png","jpg","jpeg"],
  },
});

module.exports = {
    cloudinary,
    storage
}