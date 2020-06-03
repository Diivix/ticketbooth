const express = require('express');
const router = express.Router();
const db = require('../../models');
const bcrypt = require('bcrypt');
const createToken = require('../../utils/token')
const debug = require('debug')('route:token'); // debug logger

router.post('/', async function(req, res) {
  // if(req.user.role !== 'admin') {
  //   return res.status(403).send('Only administrators can create users.');
  // }
  if (!req.body.email) return res.status(400).send();
  if (!req.body.username) return res.status(400).send();
  if (!req.body.password) return res.status(400).send();
  if (!req.body.token || req.body.token !== process.env.SIGNUP_KEY) return res.status(400).send(); // not so secret token to restrict user signup

  const { username, email, password } = req.body;

  const existingUser = await db.users.findOne({ where: { email: email } })
      .catch((err) => {
        debug('Error retrieving user. %o', JSON.stringify(err));
      });
    
  // if true, user exists, but don't tell the client.
  if (existingUser) return res.status(400).send();

  // Hash the password and create the user.
  bcrypt.hash(password, 10, function(err, passwordHash) {
    if (err) {
      return res.status(500).send(err);
    }

    const role = 'user';
    const date = new Date().toISOString();
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
