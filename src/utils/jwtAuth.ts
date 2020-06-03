import { Strategy, StrategyOptions } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
// @ts-ignore
import db from "../models";
import fs from "fs";
import debug from "debug";
import { isUndefined } from "util";

const logger = debug("utils:jwtAuth");

let secretOrKey = undefined;
if(isUndefined(process.env.PUBLIC_KEY)) {
  logger("SecretOrKey is undefined. Cannot properly sign JWT.");
} else {
  secretOrKey = fs.readFileSync(process.env.PUBLIC_KEY);
}

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
  secretOrKey: secretOrKey,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  algorithms: ["RS256"]
};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
// opts.secretOrKey = fs.readFileSync(process.env.PUBLIC_KEY);
// opts.issuer = process.env.JWT_ISSUER;
// opts.audience = process.env.JWT_AUDIENCE;
// opts.algorithm = ["RS256"];

export const jwtStrategy = new Strategy(opts, function(jwt_payload: any, done: any) {
  logger("Authenticating with Passport jwt strategy");
  logger("JWT payload is: %o", JSON.stringify(jwt_payload));
  db.users
    .findOne({ where: { email: jwt_payload.claims.sub } })
    .then((user: any) => {
      if (!user) {
        logger("User not found");
        return done("User not found.", false);
      }
      logger("User authenticated, user is %o", user.username);
      return done(null, user);
    })
    .catch((err: Error) => {
      logger(err);
      return done(err, false);
    });
});
