const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const bcrypt = require('bcryptjs');
const faunadb = require('faunadb');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: `fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`,
});




exports.handler = async (event,context,callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
  try {
             let body;
        try{
                body = JSON.parse(event.body);
        }catch(ex){
                body = event.body;
        }

        let username = body.username;


var smtpTransport = nodemailer.createTransport("SMTP",{
             host: "smtp.live.com", // hostname
    secureConnection: true, // use SSL
    port: 25, // port for secure SMTP
            auth: {
                 user: "horizonpropertyproject@hotmail.com",
                 pass: "horizon1234"
            }
        });
        var mailOptions = {
            from: "horizonpropertyproject@hotmail.com", // sender address
    to:username, // list of receivers
    subject: "Enquiry for the price of sheth zuri platinum-belt : Actual Sample Flat", // Subject line
    html: "<b>Client Name:  "+" </b><br><b>Email Id:  "+req.body.email+"</b><br><b>Country:  "+"</b><br><b>Mobile No.:  "+"</b><br><b>Require Room Type:  "+"</b><br><b>Visit Date  "+"</b><br><b>visit Time:  "+" "+"</b></br>" // html body

        }
 let info =  await  smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
             return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world4470007!' +username +"777"+ info.response +'</h1>',
    cors: true,
  } 
        }else{
           return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world4470007!' +username +"888"+ info.response +'</h1>',
    cors: true,
  } 
        } 
    }); 




    


      
      
      
     
    } catch (err) { 
        const error = {
            status: err.status || 500,
            message: err.message || "Internal server error."
        }
        callback(JSON.stringify(error));
    } 
}

