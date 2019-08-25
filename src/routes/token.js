const fs = require('fs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../models');

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Returns a JWT for the user.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JWT returned.
 *       500:
 *         description: Server error.
 */
router.post('/', function(req, res) {
  const authHeader = req.get('authorization').split(' ')[1];
  const buff = Buffer.from(authHeader, 'base64');
  const email = buff.toString('ascii').split(':')[0]; // colons in the email or password will break this.

  db.users
    .findOne({ where: { email: email } })
    .then(user => {
      const claims = {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: 'user'
      };
      var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
      const expiration = '12h';

      jwt.sign({ claims }, privateKey, { expiresIn: expiration }, function(err, token) {
        if (err) {
          return res.status(500);
        }

        return res.status(200).send(token);
      });
    })
    .catch(err => {
      return res.status(500);
    });

  // TODO: generate the token
  // return res.status(200).send(email);
});

module.exports = router;
