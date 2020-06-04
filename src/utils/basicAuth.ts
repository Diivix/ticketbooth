import { BasicStrategy } from 'passport-http'; //.BasicStrategy;
import bcrypt from 'bcrypt';
// @ts-ignore
import db from '../models/index';
import debug from 'debug';

const logger = debug('utils:basicAuth');

// Configure the Basic strategy for use by Passport.
//
// The Basic strategy requires a `verify` function which receives the
// credentials (`username` and `password`) contained in the request.  The
// function must verify that the password is correct and then invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after
// authentication.
export const basicStrategy = new BasicStrategy(function (email: string, password: string, cb) {
  logger('Authenticating with Passport basic strategy');
  db.users
    .findOne({ where: { email: email } })
    .then((user: any) => {
      if (!user) {
        return cb(null, false);
      }

      bcrypt.compare(password, user.passwordHash, function (err, res) {
        if (err) {
          logger(err);
          return cb(err);
        }

        if (res) {
          logger('Authenticated, user is %o', user.username);
          return cb(null, user);
        } else {
          logger('Unknown error occured. res is %o', res);
          return cb(null, false);
        }
      });
    })
    .catch((err: Error) => {
      logger(err);
      return cb(err);
    });
});
