var axios = require('axios');
const {slackWebhookURL} = require('../configuration');

const sendSlackMessage = function (message){
    var data = JSON.stringify({"text": message});

    var config = {
      method: 'post',
      url: slackWebhookURL,
      headers: { 
        'Content-type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
}


module.exports = {
    sendSlackMessage,
  };