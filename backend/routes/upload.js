var multer = require('multer');
var AWS = require('aws-sdk');
const {uuid} = require('uuidv4');

const { accessKeyId, secretAccessKey, awsS3Bucket } = require('../configuration/index');

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'eu-central-1',
});

var s3 = new AWS.S3();

const getUploadRoute = function(name, limit){
    multer({
        dest: `./pubic/uploads/${name}/`, 
        limits : { fileSize:limit },
        rename: function (fieldname, filename) {
            return `${uuid()}/${filename}`;
        },
        onFileUploadData: function (file, data, req, res) {
          var params = {
            Bucket: awsS3Bucket,
            Key: `/${name}/${file.name}`,
            Body: data
          };
      
          s3.putObject(params, function (perr, pres) {
            if (perr) {
              console.log(`Error uploading data to /${name}/${file.name}: `, perr);
            } else {
              console.log(`Successfully uploaded data to /${name}/${file.name}`);
            }
          });
        }
      });
      
}

const cvUploadRoute = getUploadRoute("cv", 5242880)
const imageUploadRoute = getUploadRoute("image", 5242880)
const videoUploadRoute = getUploadRoute("video", 26214400)

module.exports = {
    cvUploadRoute,
    imageUploadRoute,
    videoUploadRoute
  };