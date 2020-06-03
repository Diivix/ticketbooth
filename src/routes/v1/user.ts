import express from "express";
import debug from "debug";
import bcrypt from "bcrypt";
// @ts-ignore
import db from "../../models/index";

const logger = debug("route:user");
const router = express.Router();

router.get("/", function(req, res) {
  // @ts-ignore
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then((user: any) => res.status(200).send(cleanUser(user)))
    .catch((err: Error) => {
      logger("There was an error getting the user", JSON.stringify(err));
      return res.status(500).send(err);
    });
});

router.put("/", async function(req, res) {
  // @ts-ignore
  const id = parseInt(req.user.id);
  const { username, email, password } = req.body;
  const date = new Date().toISOString();

  bcrypt.hash(password, 10, function(err, passwordHash) {
    if (err) {
      return res.status(500).send(err);
    }

    db.users
      .findByPk(id)
      // @ts-ignore
      .then(user => {
        return user
          .update({ username, email, passwordHash, date })
          .then(() => res.status(200).send(cleanUser(user)))
          .catch((err: Error) => {
            logger("There was an error updating the user", JSON.stringify(err));
            return res.status(500).send(err);
          });
      })
      .catch((err: Error) => {
        logger("There was an error getting the user", JSON.stringify(err));
        return res.status(500).send(err);
      });
  });
});

router.delete("/", function(req, res) {
  // @ts-ignore
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then((user: any) => user.destroy({ force: true }))
    .then(() => res.status(200).send(id))
    .catch((err: Error) => {
      logger("There was an error getting the user", JSON.stringify(err));
      return res.status(500).send(err);
    });
});

const cleanUser = (user: any) => {
  return {
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

export default router;