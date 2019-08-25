const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt');
const db = require('../models');

// Configure the Basic strategy for use by Passport.
//
// The Basic strategy requires a `verify` function which receives the
// credentials (`username` and `password`) contained in the request.  The
// function must verify that the password is correct and then invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new Strategy(function(email, password, cb) {
    db.users
      .findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          return cb(null, false);
        }

        bcrypt.compare(password, user.passwordHash, function(err, res) {
          if (err) {
            return cb(err);
          }

          if (res) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        });
      })
      .catch(err => {
        return cb(err);
      });
  })
);

module.exports = passport;
