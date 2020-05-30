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


exports.handler =  async (req, res) => {
    const { username, password } = req.body;
    if ( !username || !password ) {
        res.send('incomplete input!')
        return;        
    }
    try {
        let { data } = await client.query(
q.Get(q.Match(q.Index('users_by_username'), username))
        )
    
       // let result =  await compare(password, data.password)
        if (!(password  == data.password)) {
            res.send({error: 'wrong password'})
            return
        }
        let token = generate(data.username)
        res.send({ token })
    }
    catch (e) {
        res.send({error: 'user not found'})
    }
}
