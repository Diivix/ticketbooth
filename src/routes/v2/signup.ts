import express from 'express';
import { createToken } from '../../utils/token';
import debug from 'debug';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
// @ts-ignore
import db from '../../models/index';

const logger = debug('route:signup');
const router = express.Router();

router.post(
  '/',
  [
    body('email').isEmail().notEmpty().normalizeEmail(),
    body('username').notEmpty().trim(),
    body('password').notEmpty().trim().isLength({ min: 5 }),
    body('token')
      .notEmpty()
      .trim()
      .if((value: string) => value == process.env.SIGNUP_KEY),
  ],
  async function (req: any, res: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser = await db.users.findOne({ where: { email: email } }).catch((err: Error) => {
      logger('Error retrieving user. %o', JSON.stringify(err));
    });

    // if true, user exists, but don't tell the client.
    if (existingUser) return res.status(400).send();

    // Hash the password and create the user.
    bcrypt.hash(password, 10, function (err, passwordHash) {
      if (err) {
        return res.status(500).send(err);
      }

      const role = 'user';
      const date = new Date().toISOString();
      db.users
        .create({ username, email, passwordHash, role, createdAt: date, updatedAt: date })
        .then((user: any) => {
          const token = createToken(user);
          if (token === null) {
            return res.status(500);
          }

          return res.status(200).send(token);
        })
        .catch((err: Error) => {
          logger('There was an error creating the user', JSON.stringify(err));
          return res.status(500).send(err);
        });
    });
  }
);

export default router;
