const fs = require('fs');
const jwt = require('jsonwebtoken');
const debug = require('debug')('utils:token'); // debug logger

const createToken = (user) => {
  debug('Creating token');
  var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
  const options = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: 'RS256'
  };
  const claims = {
    _id: user.id,
    sub: user.email,
    name: user.username,
    role: user.role,
  };

  debug('Token claims are: %o', JSON.stringify(claims));

  return jwt.sign({ claims }, privateKey,  options);
}

module.exports = createToken;
