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
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'infoeclimax@gmail.com',
            pass: 'eclimax.com'
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        to: username,
        subject: 'COMPRA eClimax.com',
        text: 'Hello world?', // plain text body
        html: '<h1>Hello world4470007</h1>' // html body
    };
   let info =  await   transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
                      return {
    status: 500,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world4470007!</h1>',
    cors: true,
  } 
        }
                   return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world4470007!' +username +"778887"+ info.response +'</h1>',
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

