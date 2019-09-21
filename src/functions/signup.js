// @ts-check
const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const faunadb = require('faunadb');
const bcrypt = require('bcryptjs');

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

app.post('/.netlify/functions/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log(await client.query(q.Paginate(q.Match(q.Index('all_users')))));

    /** @type { { data: { username: string } } }  */
    const user = await client.query(
      q.Create(q.Collection('users'), {
        data: { username, password: await bcrypt.hash(password, 10) },
      }),
    );

    res.json({
      user: {
        username: user.data.username,
      },
    });
  } catch (error) {
    next(error);
  }
});

registerDefaultErrorHandler();

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
