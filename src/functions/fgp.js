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


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //host: 'smtp.sina.com',
         service: '163',
        // port: 465,
        //secure: false, // true for 465, false for other ports
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'wwloveljj@163.com', // generated ethereal user
            pass: 'wocaonima' // generated ethereal password
        }
    })



const url = "http://127.0.0.1:8076/dy/change-password.html";
 
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '<wwloveljj@163.com>', // sender address
        to: username, // list of receivers
        subject: "767687", // Subject line
        html: `<b>${username}76768,<span style="color:red">767878</span></b>
    <a href=${url}>${url}</a>,<h2>7867687</h2>` // html body
    });


    
  return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world4470007!' +username +"888"+ info.response +'</h1>',
    cors: true,
  } 

      
      
      
     
    } catch (err) { 
        const error = {
            status: err.status || 500,
            message: err.message || "Internal server error."
        }
        callback(JSON.stringify(error));
    } 
}

