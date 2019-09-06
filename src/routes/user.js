const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  return db.users
    .findByPk(id)
    .then(user => res.status(200).send(cleanUser(user)))
    .catch(err => {
      console.log('There was an error getting the user', JSON.stringify(err));
      return res.status(500).send(err);
    });
});

router.put('/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  let { username, email, password } = req.body;
  const date = new Date().toISOString();

  bcrypt.hash(password, 10, function(err, passwordHash) {
    if (err) {
      return res.status(500).send(err);
    }

    db.users
      .findByPk(id)
      .then(user => {
        return user
          .update({ username, email, passwordHash, date })
          .then(() => res.status(200).send(cleanUser(user)))
          .catch(err => {
            console.log('There was an error updating the user', JSON.stringify(err));
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        console.log('There was an error getting the user', JSON.stringify(err));
        return res.status(500).send(err);
      });
  });
});

router.delete('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  return db.users
    .findByPk(id)
    .then(user => user.destroy({ force: true }))
    .then(() => res.status(200).send(id))
    .catch(err => {
      console.log('There was an error getting the user', JSON.stringify(err));
      return res.status(500).send(err);
    });
});

const cleanUser = user => {
  return {
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

module.exports = router;
