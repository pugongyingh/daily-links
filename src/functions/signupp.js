// @ts-check
const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const bcrypt = require('bcryptjs');
const faunadb = require('faunadb');
const jwt = require('jsonwebtoken');

const q = faunadb.query;

const client = new faunadb.Client({
  secret: `fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`,
});

app.post('/.netlify/functions/signupp', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    /** @type { { data: { username: string, password: string } } }  */
    const user = await client.query(
      q.Create(q.Collection('users'), {data: { username, password},}),
    );


    const token = jwt.sign(
      {
        username: username,
      },
      'secret',
      {
        expiresIn: '1h',
      },
    );

    res.json({
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

registerDefaultErrorHandler();

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
