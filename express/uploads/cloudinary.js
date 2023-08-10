const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:"dv1y2f23o",
    api_key:"485677763374271",
    api_secret:"3JmeP9Vwzj9GcPDSp1Nns83HtQI"

});
const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'yelp-camp',
        allowedFormats: ['jpeg','png','jpg'], 
    }
    
  });
  module.exports={
    cloudinary,
    storage
  }
  // hadi khedmtha instalina package manager ismou cloudinary multer w houwa ytal3elna les photos wela files f 
  //webs