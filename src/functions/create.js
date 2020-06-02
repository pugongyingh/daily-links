var express = require('express');
const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const faunadb = require('faunadb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const q = faunadb.query;

const client = new faunadb.Client({
  secret:`fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`,
});


function encrypt(password) {
    return bcrypt.hash(password, 8)
}

function compare(password, hash) {
    return bcrypt.compare(password, hash)
}

const jwt_secret = 'jwt_secret';

async function verify(token) {
    try {
        return await jwt.verify(token, jwt_secret);
    }
    catch(err) {
        return false;
    }
}

function generate(user) {
    return jwt.sign({ user }, jwt_secret, { expiresIn: '15m' })
}


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
        let password = body.password;
    //const { username, password } = req.body;
    if ( !username || !password ) {
       // res.send('incomplete input!')

      //  return;        
    }

        let { data } = await client.query(
q.Get(q.Match(q.Index('users_by_username'), username))
        )
    
       // let result =  await compare(password, data.password)
        if (!(password  == data.password)) {
          //  res.send({error: 'wrong password'})
           // return
        }
        let token = generate(data.username)
      //  res.send({ token })
  return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: JSON.stringify({token: token}),
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
        
        

