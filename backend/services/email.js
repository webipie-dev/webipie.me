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
        <div class="cos-card" style="background-color: #1b3721; color: white ; padding: 50px 0;">
            <div class="cos-header-container" >
                <div class="cos-header" style="display: flex; width: 80%; margin:0 auto; align-items:center; ">
                    <div class="cos-left">
                        <img src="https://webipie.me/assets/SVG/logo.png" alt="logo" style="width:150px">
                    </div>
                    <div class="cos-right" style="margin : 40px 0 0 80px">
                        <a href="#" style="font-size: 2vw; color: white;text-decoration:none">Go back to the website</a>
                    </div>
                </div>
            </div>
            <div class="cos-body" style="text-align:center">
                <!-- <img src="https://webipie.me/assets/SVG/email.svg"> -->
                <img src="https://webipie.me/assets/email.png" style="width:18vw; height:18vw; object-fit:cover ;background-color: white; border-radius:50%">
                <h1 style="width:90%">Welcome to Webipie.me</h1>
                <p style="font-size:20px; width:90%">We Created a personal account for you. Please confirm your e-mail adress</p>
                <a href="#" style="text-decoration: none; color: white; background-color: #3aaf85; padding:15px 25px; margin-bottom:50px">Confirm Email</a>
                <hr style="margin-top:25px">
                <p style="font-size:18px; width:90%;margin:auto">In case the button doesn't work please visit this link ${httpProtocol}://${clientHostname}${portString}/register/confirmation?token=\n\nThank You!\n</p>
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