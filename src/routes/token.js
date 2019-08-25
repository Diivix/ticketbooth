const express = require('express');
const router = express.Router();
const db = '../models';

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Returns a JWT for the user.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JWT returned.
 *       500:
 *         description: Server error.
 */
router.post('/', function(req, res) {
  const data = req.get('authorization').split(' ')[1];
  const buff = Buffer.from(data, 'base64');
  const emailAndPassword = buff.toString('ascii').split(':'); // colons in the email or password will break this.

  // TODO: generate the token
  return res.status(200).send(emailAndPassword[0]);
});

module.exports = router;
