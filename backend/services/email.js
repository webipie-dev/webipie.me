const { mailgunAPIKey, mailgunDomainName, mailgunHost } = require('../configuration/index');

var api_key = mailgunAPIKey;
var domain = mailgunDomainName;
var host = mailgunHost;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain, host: host});
 


const sendEmail = function (from, to, subject, text) {
    var data = {
        from: `<${from}>`,
        to: to,
        subject: subject,
        text: text
    };
       
    mailgun.messages().send(data, function (error, body) {
        if(error){
            console.log(error);
            return error;
        }
        else 
            return null;
    });
}


module.exports = {
    sendEmail
}