const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const createToken = require('../utils/token')
const debug = require('debug')('route:token'); // debug logger

router.post('/', async function(req, res) {
  if(req.user.role !== 'admin') {
    return res.status(403).send('Only administrators can create users.');
  }

  const { username, email, password } = req.body;
  const role = 'user';
  const date = new Date().toISOString();

  bcrypt.hash(password, 10, function(err, passwordHash) {
    if (err) {
      return res.status(500).send(err);
    }

    //TODO: Check that a user with the same email hasn't already been created.

    db.users
      .create({ username, email, passwordHash, role, date, date })
      .then(user => {
        const token = createToken(user);
        if(token === null) {
          return res.status(500);
        }
        
        return res.status(200).send(token);
      })
      .catch(err => {
        debug('There was an error creating the user', JSON.stringify(err));
        return res.status(500).send(err);
      });
  });
});

module.exports = router;
