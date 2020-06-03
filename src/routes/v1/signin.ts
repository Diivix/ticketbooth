import express from "express";
import { createToken } from "../../utils/token";
import debug from "debug";

const logger = debug("route:signin");
const router = express.Router();

router.post("/", function(req, res) {
  const token = createToken(req.user);
  if(token === null) {
    return res.status(500);
  }

  // @ts-ignore
  logger(`User ${req.user?.username} signed in.`, );
  return res.status(200).send({token});
});

export default router;