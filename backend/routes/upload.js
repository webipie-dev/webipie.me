var multer = require('multer');
var AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const multerS3 = require("multer-s3");


const { accessKeyId, secretAccessKey, awsS3Bucket } = require('../configuration/index');

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'eu-central-1',
});

var s3 = new AWS.S3({
  Bucket: "webipie.me-uploads"
});

const getFileFilter = function(mimetypes){
  return (req, file, cb) => {
    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type, allowed mimetypes: ${mimetypes}`), false);
    }
  };
}

const getUpload = function(name, limit, fileFilter){
    return multer({
        fileFilter: fileFilter,
        limits : { fileSize:limit },
        storage: multerS3({
          acl: "public-read",
          s3,
          bucket: 'webipie.me-uploads',
          key: function (req, file, cb) {
            cb(null, `${name}/${uuidv4()}/${file.originalname}`);
          },
        }),

      }).single('file');
}

const getUploadHandler = function(name, limit, fileFilter){
  const upload = getUpload(name, limit, fileFilter)
  return function (req, res) {

    upload(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: `File upload ${name} operation failed`,
            detail: err.message,
            error: err,
          },
        });
      }
  
      res.status(200).json({ success: true, url: req.file.location })
    });
  }
}

const cvUpload = getUploadHandler("cv", 5242880, getFileFilter(["application/pdf"]))
const imageUpload = getUploadHandler("image", 5242880, getFileFilter(["image/jpeg", "image/png"]))
const videoUpload = getUploadHandler("video", 26214400, getFileFilter(["video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/3gpp", "video/3gpp2"]))



router.post("/cv", cvUpload);
router.post('/image/', imageUpload)
router.post('/video/', videoUpload)


  



module.exports = router;
