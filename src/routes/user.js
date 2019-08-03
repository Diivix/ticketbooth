const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('User api works!');
});

// Create new user
router.post('/', function(req, res) {
  res.sendStatus(501);
});

// Update user
router.put('/:id', function(req, res) {
  res.sendStatus(501);
});

// Delete user
router.delete('/:id', function(req, res) {
  res.sendStatus(501);
});

module.exports = router;
