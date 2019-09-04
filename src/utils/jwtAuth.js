const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const fs = require('fs');
const debug = require('debug')('jwtAuth') // debug logger

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = fs.readFileSync(process.env.PUBLIC_KEY);
opts.issuer = 'ticketbooth.auth.com';
opts.audience = 'reroll.com';
opts.ignoreExpiration = true;

debug('Here################dddddd')

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    debug('Here################')
    console.log(jwt_payload);
    db.users
      .findOne({ where: { email: jwt_payload.sub } })
      .then(user => {
        if (!user) {
          return done('User not found.', false);
        }
        debug("Here!!!!!!!!!!!!!!!!");
        return done(null, user);
      })
      .catch(err => {
        return done(err, false);
      });
  })
);

module.exports = passport;
