/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./sequelize.json":
/*!************************!*\
  !*** ./sequelize.json ***!
  \************************/
/*! exports provided: development, test, production, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"development\\\":{\\\"dialect\\\":\\\"sqlite\\\",\\\"storage\\\":\\\"./database.sqlite3\\\"},\\\"test\\\":{\\\"dialect\\\":\\\"sqlite\\\",\\\"storage\\\":\\\":memory\\\"},\\\"production\\\":{\\\"dialect\\\":\\\"sqlite\\\",\\\"storage\\\":\\\"/data/database.sqlite3\\\"}}\");\n\n//# sourceURL=webpack:///./sequelize.json?");

/***/ }),

/***/ "./src/models/index.js":
/*!*****************************!*\
  !*** ./src/models/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nvar basename = path.basename(__filename);\nvar env = \"development\" || false; //const config = require(path.join(process.cwd(), 'sequelize.json'))[env];\n\nvar config = __webpack_require__(/*! ../../sequelize.json */ \"./sequelize.json\")[env];\n\nvar db = {};\nvar sequelize;\n\nif (config.use_env_variable) {\n  sequelize = new Sequelize(process.env[config.use_env_variable], config);\n} else {\n  sequelize = new Sequelize(config.database, config.username, config.password, config);\n}\n\nfs.readdirSync(__dirname).filter(function (file) {\n  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';\n}).forEach(function (file) {\n  var model = sequelize['import'](path.join(__dirname, file));\n  db[model.name] = model;\n});\nObject.keys(db).forEach(function (modelName) {\n  if (db[modelName].associate) {\n    db[modelName].associate(db);\n  }\n}); // db.sequelize = sequelize;\n\ndb.Sequelize = Sequelize;\nmodule.exports = db;\n\n//# sourceURL=webpack:///./src/models/index.js?");

/***/ }),

/***/ "./src/routes/signin.js":
/*!******************************!*\
  !*** ./src/routes/signin.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar createToken = __webpack_require__(/*! ../utils/token */ \"./src/utils/token.js\");\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('route:signin'); // debug logger\n\n\nrouter.post('/', function (req, res) {\n  var token = createToken(req.user);\n\n  if (token === null) {\n    return res.status(500);\n  }\n\n  debug('User %o signed in.', req.user.username);\n  return res.status(200).send(token);\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/signin.js?");

/***/ }),

/***/ "./src/routes/signup.js":
/*!******************************!*\
  !*** ./src/routes/signup.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar db = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nvar createToken = __webpack_require__(/*! ../utils/token */ \"./src/utils/token.js\");\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('route:token'); // debug logger\n\n\nrouter.post('/', function _callee(req, res) {\n  var _req$body, username, email, password, role, date;\n\n  return regeneratorRuntime.async(function _callee$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          if (!(req.user.role !== 'admin')) {\n            _context.next = 2;\n            break;\n          }\n\n          return _context.abrupt(\"return\", res.status(403).send('Only administrators can create users.'));\n\n        case 2:\n          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;\n          role = 'user';\n          date = new Date().toISOString();\n          bcrypt.hash(password, 10, function (err, passwordHash) {\n            if (err) {\n              return res.status(500).send(err);\n            } //TODO: Check that a user with the same email hasn't already been created.\n\n\n            db.users.create(_defineProperty({\n              username: username,\n              email: email,\n              passwordHash: passwordHash,\n              role: role,\n              date: date\n            }, \"date\", date)).then(function (user) {\n              var token = createToken(user);\n\n              if (token === null) {\n                return res.status(500);\n              }\n\n              return res.status(200).send(token);\n            })[\"catch\"](function (err) {\n              debug('There was an error creating the user', JSON.stringify(err));\n              return res.status(500).send(err);\n            });\n          });\n\n        case 6:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/signup.js?");

/***/ }),

/***/ "./src/routes/user.js":
/*!****************************!*\
  !*** ./src/routes/user.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar db = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('route:user'); // debug logger\n\n\nrouter.get('/', function (req, res) {\n  var id = parseInt(req.user.id);\n  return db.users.findByPk(id).then(function (user) {\n    return res.status(200).send(cleanUser(user));\n  })[\"catch\"](function (err) {\n    debug('There was an error getting the user', JSON.stringify(err));\n    return res.status(500).send(err);\n  });\n});\nrouter.put('/', function _callee(req, res) {\n  var id, _req$body, username, email, password, date;\n\n  return regeneratorRuntime.async(function _callee$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          id = parseInt(req.user.id);\n          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;\n          date = new Date().toISOString();\n          bcrypt.hash(password, 10, function (err, passwordHash) {\n            if (err) {\n              return res.status(500).send(err);\n            }\n\n            db.users.findByPk(id).then(function (user) {\n              return user.update({\n                username: username,\n                email: email,\n                passwordHash: passwordHash,\n                date: date\n              }).then(function () {\n                return res.status(200).send(cleanUser(user));\n              })[\"catch\"](function (err) {\n                debug('There was an error updating the user', JSON.stringify(err));\n                return res.status(500).send(err);\n              });\n            })[\"catch\"](function (err) {\n              debug('There was an error getting the user', JSON.stringify(err));\n              return res.status(500).send(err);\n            });\n          });\n\n        case 4:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  });\n});\nrouter[\"delete\"]('/', function (req, res) {\n  var id = parseInt(req.user.id);\n  return db.users.findByPk(id).then(function (user) {\n    return user.destroy({\n      force: true\n    });\n  }).then(function () {\n    return res.status(200).send(id);\n  })[\"catch\"](function (err) {\n    debug('There was an error getting the user', JSON.stringify(err));\n    return res.status(500).send(err);\n  });\n});\n\nvar cleanUser = function cleanUser(user) {\n  return {\n    username: user.username,\n    email: user.email,\n    createdAt: user.createdAt,\n    updatedAt: user.updatedAt\n  };\n};\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/user.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar http = __webpack_require__(/*! http */ \"http\");\n\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\"); // const cors = require('cors')\n\n\nvar passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('server'); // debug logger\n\n\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\"); // request logger\n\n\nvar userRouter = __webpack_require__(/*! ./routes/user */ \"./src/routes/user.js\");\n\nvar signinRouter = __webpack_require__(/*! ./routes/signin */ \"./src/routes/signin.js\");\n\nvar signupRouter = __webpack_require__(/*! ./routes/signup */ \"./src/routes/signup.js\");\n\nvar basicStrategy = __webpack_require__(/*! ./utils/basicAuth */ \"./src/utils/basicAuth.js\");\n\nvar jwtStrategy = __webpack_require__(/*! ./utils/jwtAuth */ \"./src/utils/jwtAuth.js\");\n\nvar app = express();\ndebug('booting %o', 'Ticketbooth'); // const corsWhitelist = process.env.CORS_WHITELIST.split(\",\");\n// const corsOptions = {\n//   origin: function (origin, callback) {\n//     if (corsWhitelist.indexOf(origin) !== -1 || (process.env.NODE_ENV !== \"production\" && !origin)) {\n//       callback(null, true)\n//     } else {\n//       callback('Not allowed by CORS')\n//     }\n//   }\n// }\n// app.use(cors(corsOptions));\n\napp.use(helmet());\napp.use(express.json());\napp.use(morgan('dev'));\npassport.use(basicStrategy);\npassport.use(jwtStrategy); // Routes\n// Need to be admin user to signup new users.\n\napp.use('/signup', passport.authenticate('jwt', {\n  session: false\n}), signupRouter);\napp.use('/signin', passport.authenticate('basic', {\n  session: false\n}), signinRouter);\napp.use('/user', passport.authenticate('jwt', {\n  session: false\n}), userRouter); // Default route\n\napp.use('/', function (req, res) {\n  res.send('Ticketbooth api works!');\n});\nhttp.createServer(app).listen(process.env.PORT); // https.createServer({\n//   key: fs.readFileSync(process.env.SERVER_KEY),\n//   cert: fs.readFileSync(process.env.SERVER_CERT)\n// }, app).listen(process.env.PORT);\n\ndebug('Server listening on port ' + process.env.PORT);\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "./src/utils/basicAuth.js":
/*!********************************!*\
  !*** ./src/utils/basicAuth.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var BasicStrategy = __webpack_require__(/*! passport-http */ \"passport-http\").BasicStrategy;\n\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nvar db = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('utils:basicAuth'); // debug logger\n// Configure the Basic strategy for use by Passport.\n//\n// The Basic strategy requires a `verify` function which receives the\n// credentials (`username` and `password`) contained in the request.  The\n// function must verify that the password is correct and then invoke `cb` with\n// a user object, which will be set at `req.user` in route handlers after\n// authentication.\n\n\nvar strategy = new BasicStrategy(function (email, password, cb) {\n  debug('Authenticating with Passport basic strategy');\n  db.users.findOne({\n    where: {\n      email: email\n    }\n  }).then(function (user) {\n    if (!user) {\n      return cb(null, false);\n    }\n\n    bcrypt.compare(password, user.passwordHash, function (err, res) {\n      if (err) {\n        debug(err);\n        return cb(err);\n      }\n\n      if (res) {\n        debug('Authenticated, user is %o', user.username);\n        return cb(null, user);\n      } else {\n        debug('Unknown error occured. res is %o', res);\n        return cb(null, false);\n      }\n    });\n  })[\"catch\"](function (err) {\n    debug(err);\n    return cb(err);\n  });\n});\nmodule.exports = strategy;\n\n//# sourceURL=webpack:///./src/utils/basicAuth.js?");

/***/ }),

/***/ "./src/utils/jwtAuth.js":
/*!******************************!*\
  !*** ./src/utils/jwtAuth.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var JwtStrategy = __webpack_require__(/*! passport-jwt */ \"passport-jwt\").Strategy;\n\nvar ExtractJwt = __webpack_require__(/*! passport-jwt */ \"passport-jwt\").ExtractJwt;\n\nvar db = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('utils:jwtAuth'); // debug logger\n\n\nvar opts = {};\nopts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme(\"Bearer\");\nopts.secretOrKey = fs.readFileSync(process.env.PUBLIC_KEY);\nopts.issuer = process.env.JWT_ISSUER;\nopts.audience = process.env.JWT_AUDIENCE;\nopts.algorithm = [\"RS256\"];\nvar strategy = new JwtStrategy(opts, function (jwt_payload, done) {\n  debug('Authenticating with Passport jwt strategy');\n  debug('JWT payload is: %o', JSON.stringify(jwt_payload));\n  db.users.findOne({\n    where: {\n      email: jwt_payload.claims.sub\n    }\n  }).then(function (user) {\n    if (!user) {\n      debug('User not found');\n      return done('User not found.', false);\n    }\n\n    debug('User authenticated, user is %o', user.username);\n    return done(null, user);\n  })[\"catch\"](function (err) {\n    debug(err);\n    return done(err, false);\n  });\n});\nmodule.exports = strategy;\n\n//# sourceURL=webpack:///./src/utils/jwtAuth.js?");

/***/ }),

/***/ "./src/utils/token.js":
/*!****************************!*\
  !*** ./src/utils/token.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('utils:token'); // debug logger\n\n\nvar createToken = function createToken(user) {\n  debug('Creating token');\n  var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);\n  var options = {\n    issuer: process.env.JWT_ISSUER,\n    audience: process.env.JWT_AUDIENCE,\n    expiresIn: process.env.JWT_EXPIRES_IN,\n    algorithm: 'RS256'\n  };\n  var claims = {\n    _id: user.id,\n    sub: user.email,\n    name: user.username,\n    role: user.role\n  };\n  debug('Token claims are: %o', JSON.stringify(claims));\n  return jwt.sign({\n    claims: claims\n  }, privateKey, options);\n};\n\nmodule.exports = createToken;\n\n//# sourceURL=webpack:///./src/utils/token.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-http":
/*!********************************!*\
  !*** external "passport-http" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-http\");\n\n//# sourceURL=webpack:///external_%22passport-http%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ })

/******/ });