const fs = require('fs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../models');

router.post('/', function(req, res) {
  const authHeader = req.get('authorization').split(' ')[1];
  const buff = Buffer.from(authHeader, 'base64');
  const email = buff.toString('ascii').split(':')[0]; // colons in the email or password will break this.

  const user = req.user
  const claims = {
    _id: user._id,
    sub: user.email,
    name: user.username,
    role: 'user',
    issuer: 'ticketbooth.auth.com',
    audience: 'reroll.com'
  };
  var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
  const expiration = '12h';

  jwt.sign({ claims }, privateKey, { expiresIn: expiration }, function(err, token) {
    if (err) {
      return res.status(500);
    }

    return res.status(200).send(token);
  });

  // db.users
  //   .findOne({ where: { email: email } })
  //   .then(user => {
  //     const claims = {
  //       _id: user._id,
  //       name: user.username,
  //       email: user.email,
  //       role: 'user'
  //     };
  //     var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
  //     const expiration = '12h';

  //     jwt.sign({ claims }, privateKey, { expiresIn: expiration }, function(err, token) {
  //       if (err) {
  //         return res.status(500);
  //       }

  //       return res.status(200).send(token);
  //     });
  //   })
  //   .catch(err => {
  //     return res.status(500);
  //   });
});

module.exports = router;
