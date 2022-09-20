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
    this.res.writeHead(2000);
    postMessage("The jews are in the floorboards");
    this.res.end()
}
  else if(request.sender_id == "28940258") {
    this.res.writeHead(200);
    postMessage(this.req.chunks[0]);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

/* function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      imageRegex = \^/\/image$/; 
  
  if(request.text && imageRegex.test(request.text)) {
    this.res.writeHead(200); */

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
    /*"attachments" : [
    {
        "type" : "image",
        "url"  : "https://i.groupme.com/1000x1332.jpeg.d729badedaa64411b553b86b2324e3b8"
    }
  ]
  */};

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
