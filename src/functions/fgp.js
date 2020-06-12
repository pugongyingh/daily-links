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
          service: 'Gmail',
          auth: {
              user: 'keesema@gmail.com',
              clientId: '696537653215-76v6p9gjhktbe4gkqvn6n9lj1l5tq398.apps.googleusercontent.com',
              clientSecret: 'mJT7lAGbbWr_rk63rVeI6XIs',
              refreshToken: '1/IxHAxT9LMBxoEPQc-JUR00Vvt2e--XO_ciRO993be58'
          }
      });



const url = "http://127.0.0.1:8076/dy/change-password.html";
 
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'keesema@gmail.com', // sender address
        to: username, // list of receivers
        subject: "7676878768687687879798", // Subject line
        html: `<b>76987987768,<span style="color:red">767878</span></b><h2>78678667687</h2>` 
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

