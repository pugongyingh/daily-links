// @ts-check
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

  
app.post('/.netlify/functions/fgp', async (req, res, next) => {
  try {
    const { username} = req.body;

    /** @type { { data: { username: string, password: string } } }  */
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_username'), username)),
    );

    if (user == null) {
      return next(new Error('User not found'));
    }

    const transport = nodemailer.createTransport({
    host: "smtp.sina.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: "mit777@sina.com",
        pass: "48946dc4ad709a34"

    }
    });

    //const { email }  = JSON.parse(event.body) 
    let mailOptions = {
      from: "mit777@sina.com",
      to: user.data.username,
      subject: "888",
      text: "999",
  };
    const token = jwt.sign(
      {
        username: user.data.username,
      },
      'secret',
      {
        expiresIn: '1h',
      },
    );
const url = `http://127.0.0.1:8076/dy/change-password.html?` + token;
    transporter.sendMail({
      to: user.data.username,
      subject: "Confirm email",
      html: `Please click this link to confirm your email: <a href=${url}>${url}</a>`
    });

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
