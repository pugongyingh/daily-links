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
    service: 'Hotmail',
    auth: {
      user: 'caseritosTeam@hotmail.com',
      pass: 'caseritos2020',
    },
  });
  const mailOptions = {
    from: 'caseritosTeam@hotmail.com',
    to: username,
    subject: 'Restablecimiento de Contraseña',
    text: `Su nueva contraseña es nNo olvide cambiarla cuando inicie sesión`,
  };

   let info =  await   transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
                      return {
    status: 500,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world44700879807!</h1>',
    cors: true,
  } 
        }
                   return {
    status: 200,
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

