const { mailgunAPIKey, mailgunDomainName, mailgunHost } = require('../configuration/index');

var api_key = mailgunAPIKey;
var domain = mailgunDomainName;
var host = mailgunHost;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain, host: host});

const { hostname, httpProtocol, port, clientPort, clientHostname } = require('../configuration/index');

let portString = `:${clientPort}`;
if(`${clientPort}` === '430')
    portString = '';
let url = `${httpProtocol}://${clientHostname}${portString}`
 


const sendEmail = function (from, to, subject, text ) {
    var data = {
        from: `<${from}>`,
        to: to,
        subject: subject,
        html: text
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

sendEmail(
    'confirmation@webipie.me', 'dalissj1@gmail.com', 'Account Verification',
    `   
        <div class="cos-card">
            <div class="cos-header-container">
                <div class="cos-header">
                    <div class="cos-left">
                        <img src="${url}/assets/SVG/logo.png" alt="logo">
                    </div>
                    <div class="cos-right">
                        <a href="#">Go back to the website</a>
                    </div>
                </div>
            </div>
            <div class="cos-body">
                <!-- <img src="https://webipie.me/assets/SVG/email.svg"> -->
                <img src="${url}/assets/email.png">
                <h1>Welcome to Webipie.me</h1>
                <p>We Created a personal account for you. Please confirm your e-mail adress</p>
                <a href="#"><button>Confirm Email</button></a>
            </div>
            <div class="cos-footer">
                <div class="icons">
                    <fa-icon [icon]="facebook"></fa-icon>
                    <fa-icon [icon]="twitter"></fa-icon>
                    <fa-icon [icon]="linkedin"></fa-icon>
                </div>
            </div>
        </div>`
)


module.exports = {
    sendEmail
}