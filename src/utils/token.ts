import jwt, { SignOptions } from "jsonwebtoken";
import fs from "fs";
import debug from "debug";
import { isUndefined } from "util";

const logger = debug("utils:token");

let privateKey: string = "";
if(isUndefined(process.env.PRIVATE_KEY)) {
  logger("Private key is undefined. Cannot properly create JWT.");
} else {
  privateKey = fs.readFileSync(process.env.PRIVATE_KEY).toString();
}

export const createToken = (user: any) => {
  debug("Creating token");
  const options : SignOptions = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: "RS256"
  };
  const claims = {
    _id: user.id,
    sub: user.email,
    name: user.username,
    role: user.role,
  };

  return jwt.sign({ claims }, privateKey,  options);
};
