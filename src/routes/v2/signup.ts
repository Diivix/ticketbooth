import express from 'express';
import { createToken } from '../../utils/token';
import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { connection } from '../../database/index';
import { User } from '../../models/User';
// @ts-ignore
import db from '../../models/index';

const logger = debug('route:signup');
const router = express.Router();

router.post(
  '/',
  [
    body('email').isEmail().notEmpty().normalizeEmail(),
    body('username').notEmpty().trim().if((value: string) => value.match(/^([a-z])$/i) ), // ensure only alpha characters are present
    body('password').notEmpty().trim().isLength({ min: 5 }),
    body('token')
      .notEmpty()
      .trim()
      .if((value: string) => value === process.env.SIGNUP_KEY),
  ],
  async function (req: any, res: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser =  (await connection()).manager
        .createQueryBuilder(User, 'user')
        .where('user.email = :email', { email: email })
        .getOne();

    // const existingUser = await db.users.findOne({ where: { email: email } }).catch((err: Error) => {
    //   logger('Error retrieving user. %o', JSON.stringify(err));
    // });

    // if true, user exists, but don't tell the client.
    if (existingUser) return res.status(400).send();

    // Hash the password and create the user.
    bcrypt.hash(password, 10, async function (err, passwordHash) {
      if (err) {
        return res.status(500).send(err);
      }

      const uniqueUsername = username + '#' + uuidv4().substring(0, 4);
      const date = new Date();

      const user = new User();
      user.username = uniqueUsername;
      user.email = email;
      user.passwordHash = passwordHash;
      user.role = 'user';
      user.createdBy = uniqueUsername;
      user.createdDate = date;
      user.modifiedBy = uniqueUsername;
      user.modifiedDate = date;

      (await connection()).manager
        .save(user)
        .then(user => {
          logger(`User ${user.username} (id: ${user.id}) has been saved.`);
          const token = createToken(user);

          if (token === null) return res.status(500);
          return res.status(200).send(token);
        })
        .catch((err: Error) => {
          logger('There was an error creating the user', JSON.stringify(err));
          return res.status(500).send(err);
        });

      // db.users
      //   .create({ username, email, passwordHash, role, createdAt: date, updatedAt: date })
      //   .then((user: any) => {
      //     const token = createToken(user);
      //     if (token === null) {
      //       return res.status(500);
      //     }

      //     return res.status(200).send(token);
      //   })
      //   .catch((err: Error) => {
      //     logger('There was an error creating the user', JSON.stringify(err));
      //     return res.status(500).send(err);
      //   });
    });
  }
);

export default router;
