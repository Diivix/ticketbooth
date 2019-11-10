const fs = require('fs');
const express = require('express');
const router = express.Router();
const createToken = require('../utils/token');
const debug = require('debug')('route:signin'); // debug logger

router.post('/', function(req, res) {
  const token = createToken(req.user);
  if(token === null) {
    return res.status(500);
  }

  debug('User %o signed in.', req.user.username)
  return res.status(200).send(token);
});

module.exports = router;
