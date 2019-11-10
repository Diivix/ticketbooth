require('dotenv').config()

const express = require('express');
const http = require('http');
const helmet = require('helmet');
// const cors = require('cors')
const passport = require('passport');
const fs = require('fs')
const debug = require('debug')('server') // debug logger
const morgan = require('morgan')         // request logger

const userRouter = require('./routes/user');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const basicStrategy = require('./utils/basicAuth');
const jwtStrategy = require('./utils/jwtAuth');

const app = express();
debug('booting %o', 'Ticketbooth');

// const corsWhitelist = process.env.CORS_WHITELIST.split(",");
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (corsWhitelist.indexOf(origin) !== -1 || (process.env.NODE_ENV !== "production" && !origin)) {
//       callback(null, true)
//     } else {
//       callback('Not allowed by CORS')
//     }
//   }
// }

// app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

passport.use(basicStrategy);
passport.use(jwtStrategy);

// Routes
// Need to be admin user to signup new users.
app.use('/signup', passport.authenticate('jwt', { session: false }), signupRouter);
app.use('/signin', passport.authenticate('basic', { session: false }), signinRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);

// Default route
app.use('/', function(req, res) {
  res.send('Ticketbooth api works!');
});

http.createServer(app).listen(process.env.PORT);
// https.createServer({
//   key: fs.readFileSync(process.env.SERVER_KEY),
//   cert: fs.readFileSync(process.env.SERVER_CERT)
// }, app).listen(process.env.PORT);

debug('Server listening on port ' + process.env.PORT);
