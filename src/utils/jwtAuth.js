const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const fs = require('fs');
const debug = require('debug')('utils:jwtAuth'); // debug logger

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = fs.readFileSync(process.env.PUBLIC_KEY);
opts.issuer = 'ticketbooth.auth.com';
opts.audience = 'reroll.com';
opts.ignoreExpiration = true;

const strategy = new JwtStrategy(opts, function(jwt_payload, done) {
  debug('Authenticating with Passport jwt strategy');
  debug('JWT payload is: %o', JSON.stringify(jwt_payload));
  db.users
    .findOne({ where: { email: jwt_payload.sub } })
    .then(user => {
      if (!user) {
        debug('User not found');
        return done('User not found.', false);
      }
      debug('User authenticated, user is %o', JSON.stringify(user));
      return done(null, user);
    })
    .catch(err => {
      debug(err);
      return done(err, false);
    });
});

module.exports = strategy;
