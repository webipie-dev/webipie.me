module.exports = {
    JWT_SECRET : 'secretHERE',

    EMAIL: {
        USER: 'confirmation@webipie.com',
        PASSWORD: 'webipie4win',
    },
  awsEndPoint: 'https://webipie-images.s3.eu-west-3.amazonaws.com/',
  accessKeyId: '"${aws_access_key}"',
  secretAccessKey: '"${aws_secret_key}"',
  awsRegion: '"${aws_region}"',
  webipiePhoneNumber: '+18555501648',
  twilioAccountSid: '"${twilio_account_sid}"',
  twilioAuthToken: '"${twilio_auth_token}"',
  hostedZone: '"/hostedzone/${hosted_zone_id}"',
  cloudfrontDomainName: '"${cloudfront_domain_name}"',
  useSms: true,
  hostname: '"${backend_hostname}"',
  port: "${backend_port}",
  httpProtocol: 'https',
  wsProtocol: 'wss',
  mongoURL: '"${mongo_db_url}"',
  clientPort: "430",
  clientHostname: '"${website_domain_name}"',
  mailgunAPIKey: '"${mailgun_api_key}"',
  mailgunDomainName: '"${mailgun_domain_name}"',
  mailgunHost: 'api.eu.mailgun.net'

}

