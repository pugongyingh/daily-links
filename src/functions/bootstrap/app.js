// @ts-check
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const faunadb = require('faunadb');

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_username'), payload.username)),
    );

    console.log(user);

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  }),
);

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(passport.initialize());

const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    error: error.message,
  });
};

exports.app = app;

exports.registerDefaultErrorHandler = () => app.use(errorHandler);
