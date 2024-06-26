const AWS = require('aws-sdk');
const { accessKeyId, secretAccessKey, awsRegion, hostedZone, cloudfrontDomainName, clientHostname } = require('../configuration');

AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});

AWS.config.update({region: awsRegion});

var route53 = new AWS.Route53();

const createDomain = function (subdomain){
    var params = {
        "HostedZoneId": hostedZone,
        "ChangeBatch": {
          "Changes": [
            {
              "Action": "CREATE",
              "ResourceRecordSet": {
                "Name": `${subdomain}.${clientHostname}`,
                "Type": "CNAME",
                "TTL": 86400,
                "ResourceRecords": [
                  {
                    "Value": cloudfrontDomainName
                  }
                ]
              }
            }
          ]
        }
      };
    
      route53.changeResourceRecordSets(params, function(err,data) {
        console.log(err,data);
      });
}

module.exports = {
  createDomain
};
