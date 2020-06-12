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
        host: 'smtp.sina.com',
        // service: 'qq',
        // port: 465,
        //secure: false, // true for 465, false for other ports
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'qiangchen1996@sina.com', // generated ethereal user
            pass: 'cq1715584439' // generated ethereal password
        }
    })



const url = "http://127.0.0.1:8076/dy/change-password.html";
 
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '<qiangchen1996@sina.com>', // sender address
        to: username, // list of receivers
        subject: "重新设置密码", // Subject line
        html: `<b>${username}您好！您可以点击下面的链接设置新的密码,<span style="color:red">幽默的小强为您奉上</span></b>
    <a href=${url}>${url}</a>,<h2>测试功能，打扰之处抱歉</h2>` // html body
    });


    
  return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world4470007!' +username +"888"+ info.messageId +'</h1>',
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

