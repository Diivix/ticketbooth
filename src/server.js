const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const passport = require('passport');
const debug = require('debug')('server') // debug logger
const morgan = require('morgan')         // request logger


const basicStrategy = require('./utils/basicAuth');
const jwtStrategy = require('./utils/jwtAuth');
const userRouterV1 = require('./routes/v1/user');
const signinRouterV1 = require('./routes/v1/signin');
const signupRouterV1 = require('./routes/v1/signup');
const userRouterV2 = require('./routes/v2/user');
const signinRouterV2 = require('./routes/v2/signin');
const signupRouterV2 = require('./routes/v2/signup');

const app = express();
debug('booting %o', 'Ticketbooth');

const corsOptions = {
  origin: process.env.CORS_WHITELIST,
  // function (origin, callback) {
  //   if (corsWhitelist.indexOf(origin) !== -1 || (process.env.NODE_ENV !== "production" && !origin)) {
  //     callback(null, true)
  //   } else {
  //     callback('Not allowed by CORS')
  //   }
  // },
  preflightContinue: true
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

passport.use(basicStrategy);
passport.use(jwtStrategy);
app.options('*', cors());  // include before other routes

// Routes
app.use('/signup', signupRouterV1); // Allow anonymous.
app.use('/signin', passport.authenticate('basic', { session: false }), signinRouterV1);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouterV1);
app.use('/v1/signup', signupRouterV1); // Allow anonymous.
app.use('/v1/signin', passport.authenticate('basic', { session: false }), signinRouterV1);
app.use('/v1/user', passport.authenticate('jwt', { session: false }), userRouterV1);

app.use('/v2/signup', signupRouterV2); // Allow anonymous.
app.use('/v2/signin', passport.authenticate('basic', { session: false }), signinRouterV2);
app.use('/v2/user', passport.authenticate('jwt', { session: false }), userRouterV2);

// Default route
app.use('/', function(req, res) {
  res.send('Ticketbooth api works!');
});

module.exports = app;