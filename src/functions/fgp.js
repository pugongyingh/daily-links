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




export async function handler(event, context, callback){
 // const { user, pass} = process.env
// const  body = JSON.parse(event.body);
    const username = event.body;

    /** @type { { data: { username: string, password: string } } }  */
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_username'), username)),
    );
    if (user == null) {
  return {
    statusCode: 200,
    body: "999"+username
  }
    }





  return {
    statusCode: 200,
    body: "777"+username
  }


}

