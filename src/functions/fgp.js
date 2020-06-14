const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const bcrypt = require('bcryptjs');
const faunadb = require('faunadb');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const q = faunadb.query;

//const client = new faunadb.Client({
 // secret: `fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`,
//});




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
    const transporter = nodemailer.createTransport({
    host: "smtp.163.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
      auth: {
          user: '15665690464@163.com',
          pass: 'wanys000'
      }

    });

    const mailOptions = {
        from: '15665690464@163.com',
        to: 'myweb88@protonmail.com',
        subject: 'E-mail do site',
        html: `<h1>funciona</h1>`
    };




   let info =  await  transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
                      return {
    status: 500,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world44700879807!</h1>',
    cors: true,
  } 
        }
                   return {
    status: 201,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world4470007!</h1>',
    cors: true,
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

