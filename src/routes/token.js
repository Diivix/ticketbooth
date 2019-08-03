const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Returns a JWT for the user.
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Username and password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT returned.
 *       500:
 *         description: Server error.
 */
router.post('/', function(req, res) {
  res.status(200).json({username: req.body.username});
});

module.exports = router;
