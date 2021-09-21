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
  Bucket: awsS3Bucket
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

const getMulter = function(name, limit, fileFilter){
  return multer({
    fileFilter: fileFilter,
    limits : { fileSize:limit },
    storage: multerS3({
      acl: "public-read",
      s3,
      bucket: awsS3Bucket,
      key: function (req, file, cb) {
        cb(null, `${name}/${uuidv4()}/${file.originalname}`);
      },
    }),

  })
}

const getUpload = function(name, limit, fileFilter){
    return getMulter(name, limit, fileFilter).single('file');
}

const getMultiUpload = function(name, limit, fileFilter){
    return getMulter(name, limit, fileFilter).array('file', 10)
}

const getUploadHandler = function(name, limit, fileFilter){
  const upload = getUpload(name, limit, fileFilter)
  return function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).json({
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

const getMultiUploadHandler = function(name, limit, fileFilter){
  const upload = getMultiUpload(name, limit, fileFilter)
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
  
      res.status(200).json({ success: true, urls: req.files.map(element => element.location) })
    });
  }
}

const cvUpload = getUploadHandler("cv", 5242880, getFileFilter(["application/pdf"]))
const imageUpload = getUploadHandler("image", 5242880, getFileFilter(["image/jpeg", "image/png"]))
const videoUpload = getUploadHandler("video", 26214400, getFileFilter(["video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/3gpp", "video/3gpp2"]))


const cvMultiUpload = getMultiUploadHandler("cv", 5242880, getFileFilter(["application/pdf"]))
const imageMultiUpload = getMultiUploadHandler("image", 5242880, getFileFilter(["image/jpeg", "image/png"]))
const videoMultiUpload = getMultiUploadHandler("video", 26214400, getFileFilter(["video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/3gpp", "video/3gpp2"]))



router.post("/cv", cvUpload);
router.post('/image/', imageUpload)
router.post('/video/', videoUpload)

router.post("/multi/cv", cvMultiUpload);
router.post('/multi/image/', imageMultiUpload)
router.post('/multi/video/', videoMultiUpload)


module.exports = router;
