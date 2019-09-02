const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const fs = require('fs');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = fs.readFileSync(process.env.PUBLIC_KEY);
opts.issuer = 'ticketbooth.auth.com';
opts.audience = 'reroll.com';
opts.ignoreExpiration = true;

console.log("Here####################");

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("yoyoyoyoyo");
    console.log(jwt_payload);
    db.users
      .findOne({ where: { email: jwt_payload.sub } })
      .then(user => {
        if (!user) {
          return done('User not found.', false);
        }
        console.log("Here!!!!!!!!!!!!!!!!");
        return done(null, user);
      })
      .catch(err => {
        return done(err, false);
      });
  })
);

module.exports = passport;
