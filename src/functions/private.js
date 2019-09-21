// @ts-check
const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const passport = require('passport');

app.get(
  '/.netlify/functions/private',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      res.json({
        message: 'Welcome to the jungle',
      });
    } catch (error) {
      next(error);
    }
  },
);

registerDefaultErrorHandler();

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
