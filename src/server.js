require('dotenv').config()
const debug = require('debug')('server') // debug logger
debug('booting %o', 'Ticketbooth');
const morgan = require('morgan')         // request logger

const http = require('http');
const express = require('express');
const passport = require('passport');

const userRouter = require('./routes/user');
const tokenRouter = require('./routes/token');
const signupRouter = require('./routes/signup');
const jwtStrategy = require('./utils/jwtAuth');
const basicStrategy = require('./utils/basicAuth');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

passport.use(jwtStrategy);
passport.use(basicStrategy);

// Routes
app.use('/signup', signupRouter);
app.use('/token', passport.authenticate('basic', { session: false }), tokenRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);

// Default route
app.use('/', function(req, res) {
  res.send('Ticketbooth api works!');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
debug('Server listening on port ' + port);
