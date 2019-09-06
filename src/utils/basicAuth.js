const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt');
const db = require('../models');
const debug = require('debug')('utils:basicAuth'); // debug logger

// Configure the Basic strategy for use by Passport.
//
// The Basic strategy requires a `verify` function which receives the
// credentials (`username` and `password`) contained in the request.  The
// function must verify that the password is correct and then invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after
// authentication.
const strategy = new BasicStrategy(function(email, password, cb) {
  debug('Authenticating with Passport basic strategy');
  db.users
    .findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return cb(null, false);
      }

      bcrypt.compare(password, user.passwordHash, function(err, res) {
        if (err) {
          debug(err);
          return cb(err);
        }

        if (res) {
          debug('Authenticated, user is %o', user.username);
          return cb(null, user);
        } else {
          debug('Unknown error occured. res is %o', res);
          return cb(null, false);
        }
      });
    })
    .catch(err => {
      debug(err);
      return cb(err);
    });
});

module.exports = strategy;
