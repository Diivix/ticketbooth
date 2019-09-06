const fs = require('fs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const debug = require('debug')('route:token'); // debug logger

router.post('/', function(req, res) {
  debug('Creating token');
  const user = req.user;
  var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
  const options = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: 'RS256'
  };
  const claims = {
    _id: user.id,
    sub: user.email,
    name: user.username,
    role: 'user',
  };

  debug('Token claims are: %o', JSON.stringify(claims));

  jwt.sign({ claims }, privateKey,  options, function(err, token) {
    if (err) {
      debug(err);
      return res.status(500);
    }

    debug('Token issued');
    return res.status(200).send(token);
  });
});

module.exports = router;
