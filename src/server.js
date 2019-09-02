require('dotenv').config()
const http = require('http');
const express = require('express');
const userRouter = require('./routes/user');
const tokenRouter = require('./routes/token');
const signupRouter = require('./routes/signup');
const jwtPassport = require('./utils/jwtAuth');
const basicPassport = require('./utils/basicAuth');

const app = express();
app.use(express.json());

// Routes
app.use('/signup', signupRouter);
app.use('/token', basicPassport.authenticate('basic', { session: false }), tokenRouter);
app.use('/user', jwtPassport.authenticate('jwt', { session: false }), userRouter);

// Default route
app.use('/', function(req, res) {
  res.send('Ticketbooth api works!');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
