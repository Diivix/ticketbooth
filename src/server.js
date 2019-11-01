require('dotenv').config()
const fs = require('fs')

const debug = require('debug')('server') // debug logger
const morgan = require('morgan')         // request logger
debug('booting %o', 'Ticketbooth');

const https = require('https');
const cors = require('cors')
const express = require('express');
const passport = require('passport');

const userRouter = require('./routes/user');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const basicStrategy = require('./utils/basicAuth');
const jwtStrategy = require('./utils/jwtAuth');

const app = express();

const corsWhitelist = process.env.CORS_WHITELIST.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1 || (process.env.NODE_ENV !== "production" && !origin)) {
      callback(null, true)
    } else {
      callback('Not allowed by CORS')
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

passport.use(basicStrategy);
passport.use(jwtStrategy);

// Routes
app.use('/signup', signupRouter);
app.use('/signin', passport.authenticate('basic', { session: false }), signinRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);

// Default route
app.use('/', function(req, res) {
  res.send('Ticketbooth api works!');
});

https.createServer({
  key: fs.readFileSync(process.env.SERVER_KEY),
  cert: fs.readFileSync(process.env.SERVER_CERT)
}, app).listen(process.env.PORT);

debug('Server listening on port ' + process.env.PORT);
