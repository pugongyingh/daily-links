// @ts-check
const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const bcrypt = require('bcryptjs');
const faunadb = require('faunadb');
const jwt = require('jsonwebtoken');

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

app.post('/.netlify/functions/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    /** @type { { data: { username: string, password: string } } }  */
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_username'), username)),
    );

    if (user == null) {
      return next(new Error('User not found'));
    }

    if ((await bcrypt.compare(password, user.data.password)) === false) {
      return next(new Error('Invalid password'));
    }

    const token = jwt.sign(
      {
        username: user.data.username,
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
