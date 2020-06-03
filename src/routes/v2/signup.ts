
import express from "express";
import { createToken } from "../../utils/token";
import debug from "debug";
import bcrypt from "bcrypt";
// @ts-ignore
import db from "../../models/index";

const logger = debug("route:signup");
const router = express.Router();

router.post("/", async function(req, res) {
  // if(req.user.role !== 'admin') {
  //   return res.status(403).send('Only administrators can create users.');
  // }
  if (!req.body.email) return res.status(400).send();
  if (!req.body.username) return res.status(400).send();
  if (!req.body.password) return res.status(400).send();
  if (!req.body.token || req.body.token !== process.env.SIGNUP_KEY) return res.status(400).send(); // not so secret token to restrict user signup

  const { username, email, password } = req.body;

  const existingUser = await db.users.findOne({ where: { email: email } })
      .catch((err: Error) => {
        logger("Error retrieving user. %o", JSON.stringify(err));
      });
    
  // if true, user exists, but don't tell the client.
  if (existingUser) return res.status(400).send();

  // Hash the password and create the user.
  bcrypt.hash(password, 10, function(err, passwordHash) {
    if (err) {
      return res.status(500).send(err);
    }

    const role = "user";
    const date = new Date().toISOString();
    db.users.create({ username, email, passwordHash, role, createdAt: date, updatedAt: date })
      .then((user: any) => {
        const token = createToken(user);
        if(token === null) {
          return res.status(500);
        }
        
        return res.status(200).send(token);
      })
      .catch((err: Error) => {
        logger("There was an error creating the user", JSON.stringify(err));
        return res.status(500).send(err);
      });
  });
});

export default router;