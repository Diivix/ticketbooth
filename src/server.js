const http = require('http');
const express = require('express');
const userRouter = require('./routes/user');
const tokenRouter = require('./routes/token');
var swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Ticket to Ride', // Title (required)
      version: '0.1.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['src/routes/token.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use('/token', tokenRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route
app.use('/', function(req, res) {
  res.send('Ticket to Ride api works!');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
