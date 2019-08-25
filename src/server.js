require('dotenv').config()
const http = require('http');
const express = require('express');
const userRouter = require('./routes/user');
const tokenRouter = require('./routes/token');
const signupRouter = require('./routes/signup');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const passport = require('./utils/auth');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Ticket to Ride', // Title (required)
      version: '0.1.0', // Version (required)
    },
    host: 'localhost:300',
    basePath: '/',
    securityDefinitions: {
      basicAuth: {
        type: 'basic',
        // scheme: 'basic',
      },
    },
    security: [
      {
        basicAuth: []
      }
    ]
  },
  // Path to the API docs
  apis: ['src/routes/signup.js', 'src/routes/token.js', 'src/routes/user.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());

// Routes
app.use('/signup', signupRouter);
app.use('/user', passport.authenticate('basic', { session: false }), userRouter);
app.use('/token', passport.authenticate('basic', { session: false }), tokenRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route
app.use('/', function(req, res) {
  res.send('Ticket to Ride api works!');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
