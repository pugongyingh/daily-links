// @ts-check
const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const faunadb = require('faunadb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const q = faunadb.query;

const client = new faunadb.Client({
  secret:`fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`,
});

app.post('/.netlify/functions/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log(
      await client.query(q.Get(q.Match(q.Index('users_by_username'), 'jake'))),
    );

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
    console.error(error);
    next(error);
  }
});

registerDefaultErrorHandler();

//const server = awsServerlessExpress.createServer(app);

exports.handler = async (event, context) => {
    try {
      
              let body;
        try{
                body = JSON.parse(event.body);
        }catch(ex){
                body = event.body;
        }

        let username = body.username;
        let password = body.password;
   // const { username, password } = event.body;

    /** @type { { data: { username: string, password: string } } }  */
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_username'), username)),
    );

    if (user == null) {
    /** @type { { data: { username: string } } }  */
    const user = await client.query(
      q.Create(q.Collection('users'), {
        data: { username, password: await bcrypt.hash(password, 10) },
      }),
    );
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

context.succeed(token);
  } catch (error) {
    console.error(error);
  }
  return "8888";
};
