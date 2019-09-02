const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async function(req, res) {
  const { username, email, password } = req.body;
  const date = new Date().toISOString();
  // const passwordHash = await hash(password);
  // const passwordHash = password;

  bcrypt.hash(password, 10, function(err, passwordHash) {
    if (err) {
      return res.status(500).send(err);
    }

    db.users
      .create({ username, email, passwordHash, date, date })
      .then(user => {
        // TODO: Drop the password from the response.
        return res.status(200).send(user);
      })
      .catch(err => {
        console.log('There was an error creating the user', JSON.stringify(err));
        return res.status(500).send(err);
      });
  });
});

module.exports = router;
