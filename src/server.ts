import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import debug from "debug";
import morgan from "morgan";         // request logger
import { basicStrategy } from "./utils/basicAuth";
import { jwtStrategy } from "./utils/jwtAuth";
import userRouterV1 from "./routes/v1/user";
import signinRouterV1 from "./routes/v1/signin";
import signupRouterV1 from "./routes/v1/signup";
import userRouterV2 from "./routes/v2/user";
import signinRouterV2 from "./routes/v2/signin";
import signupRouterV2 from "./routes/v2/signup";

const app = express();
const logger = debug("server");
logger("booting %o", "Ticketbooth");

const corsOptions = {
  origin: process.env.CORS_WHITELIST,
  // function (origin, callback) {
  //   if (corsWhitelist.indexOf(origin) !== -1 || (process.env.NODE_ENV !== "production" && !origin)) {
  //     callback(null, true)
  //   } else {
  //     callback('Not allowed by CORS')
  //   }
  // },
  preflightContinue: true
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

passport.use(basicStrategy);
passport.use(jwtStrategy);
app.options("*", cors());  // include before other routes

// Routes
app.use("/signup", signupRouterV1); // Allow anonymous.
app.use("/signin", passport.authenticate("basic", { session: false }), signinRouterV1);
app.use("/user", passport.authenticate("jwt", { session: false }), userRouterV1);
app.use("/v1/signup", signupRouterV1); // Allow anonymous.
app.use("/v1/signin", passport.authenticate("basic", { session: false }), signinRouterV1);
app.use("/v1/user", passport.authenticate("jwt", { session: false }), userRouterV1);

app.use("/v2/signup", signupRouterV2); // Allow anonymous.
app.use("/v2/signin", passport.authenticate("basic", { session: false }), signinRouterV2);
app.use("/v2/user", passport.authenticate("jwt", { session: false }), userRouterV2);

// Default route
app.use("/", function(req, res) {
  res.send("Ticketbooth api works!");
});

export default app;