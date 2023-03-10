const express = require("express");
const { registerController, loginController } = require("../controllers/auth");
const router = express.Router();
const { registerValidator, loginValidator } = require("../validators/auth");

/**
 * http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register new user"
 *          description: "This route is used to register a new user"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: User registered
 *                  '403':
 *                      description: Error registering user
 */
router.post('/register', registerValidator, registerController);

/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Login user and get token
 *      responses:
 *        '200':
 *          description: Returns user registered
 *        '422':
 *          description: Validation error
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *    responses:
 *      '201':
 *        description: User logged
 *      '403':
 *        description: Error loging user
 */

router.post('/login', loginValidator, loginController);

module.exports = router;