const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set content type based on file extension
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileKey = 'files_from_node/' + Date.now().toString() + file.originalname;
      console.log('Uploading file with key:', fileKey); // Log the file key
      cb(null, fileKey);
    }
  })
});

// Middleware to log file details after upload
const logFileDetails = (req, res, next) => {
  // Log the files array if available
  if (req.files) {
    req.files.forEach(file => {
      console.log('File uploaded:', file);
    });
  }
  next();
};

module.exports = {
  upload,
  logFileDetails
};
