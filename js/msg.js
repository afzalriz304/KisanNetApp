var express=require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var fs = require('fs');
var app=express();

app.use(bodyParser.json());
var urlencodedParser	=	bodyParser.urlencoded({extended: true})
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.post('/sendOTP',urlencodedParser,function(req,res){

	console.log("here")
	console.log(req.query.phone);
  var number=req.query.phone;
		var accountSid = 'ACc59c5ce7c0fde3443cd48ec26382cc06'; // Your Account SID from www.twilio.com/console
		var authToken = 'b4de6998b437c94503401257472f4fa9';   // Your Auth Token from www.twilio.com/console

		var client = new twilio(accountSid, authToken);

		client.messages.create({
			body: "Your OTP Is "+req.query.OTP,
			to: number,  // Text this number
			from: '+19286123844' // From a valid Twilio number
		})
		.then((message) => console.log(message.sid));
  req.query.OTP=req.query.OTP
  var date=new Date();
  req.query.time=date;

  fs.readFile('../contacts.txt','utf8',function(err,content){
    var parseJson = JSON.parse(content);
    var newFile=[];
    console.log(err);
    console.log(parseJson.length);
    parseJson.forEach(function (data) {
      if(data.phone==req.query.phone){
        data=req.query;
      }
      newFile.push(data);
    })
    console.log(newFile);
    fs.writeFile('../contacts.txt',JSON.stringify(newFile),function(err){})
  })
	res.send(req.query);
})


////
app.post('/AddJSONData',urlencodedParser,function(req,res){

	console.log(req.query);
  var obj={"OTP":"------","name":req.query.name,"phone":"+91"+req.query.phone,"time":"Not Sent"}


  fs.readFile('../contacts.txt','utf8',function(err,content){
    var parseJson = JSON.parse(content);
    var newFile=[];
    newFile.push(obj);
    parseJson.forEach(function (data) {
      newFile.push(data);
    })
    console.log(newFile);
    fs.writeFile('../contacts.txt',JSON.stringify(newFile),function(err){

    })
  })
	res.send('success');
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
