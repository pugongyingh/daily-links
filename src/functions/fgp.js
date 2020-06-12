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





    const transport = nodemailer.createTransport({
    host: "smtp.sina.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: "mit777@sina.com",
        pass: "48946dc4ad709a34"

    }
    });


const url = "http://127.0.0.1:8076/dy/change-password.html";
  let info =  await   transport.sendMail({
      to: username,
      subject: "Confirm email",
      html: `Please click this link to confirm your email: <a href=${url}>${url}</a>`
    });

    
  return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world4470007!' +username +"888"+ info +'</h1>',
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

