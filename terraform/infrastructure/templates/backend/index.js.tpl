module.exports = {
    JWT_SECRET : 'secretHERE',

    EMAIL: {
        USER: 'confirmation@webipie.com',
        SUPPORT: 'alaeddine.abdessalem@gmail.com',
        PASSWORD: 'webipie4win',
    },
  accessKeyId: '${aws_access_key}',
  secretAccessKey: '${aws_secret_key}',
  awsRegion: '${aws_region}',
  awsS3Bucket: '${aws_uploads_s3_bucket}',
  webipiePhoneNumber: '+18555501648',
  twilioAccountSid: '${twilio_account_sid}',
  twilioAuthToken: '${twilio_auth_token}',
  hostedZone: '/hostedzone/${hosted_zone_id}',
  cloudfrontDomainName: '${cloudfront_domain_name}',
  useSms: true,
  hostname: '${backend_hostname}',
  port: ${backend_port},
  httpProtocol: 'https',
  wsProtocol: 'wss',
  mongoURL: '${mongo_db_url}',
  clientPort: '430',
  clientHostname: '${website_domain_name}',
  mailgunAPIKey: '${mailgun_api_key}',
  mailgunDomainName: '${mailgun_domain_name}',
  mailgunHost: 'api.eu.mailgun.net',
  LINKEDIN_CLIENT_ID: '77oj8s50xw1yt7',
  LINKEDIN_CLIENT_SECRET: '${linkedin_client_secret}',
  slackWebhookURL: 'https://hooks.slack.com/services/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'
}

