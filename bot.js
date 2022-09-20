var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/sir bot$/,
       jewRegex = /^\/Sam Bloomburg$/; 

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("I am SIR BOTTINGTON SUPREME, RULER OF THE COSMOS!!!!!!");
    this.res.end();
  }
  else if(request.text && jewRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("The jews are in the floorboards");
    this.res.end()
}
  else if(request.sender_id == "28940258") {
    this.res.writeHead(200);
    postMessage("Tian sucks.");
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(b_response) {
  var botResponse, options, body, botReq;

  botResponse = b_response;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
