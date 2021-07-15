const router = require('express').Router();
const AuthController = require('../../controllers/AuthController');
const auth = require('../../utils/auth');


/**
  * @swagger
  * /signUp:
  *   post:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: email
  *       in: body
  *       description: email of user
  *       required: true
  *       schema: 
  *         type: string
  *     - name: ph_number
  *       in: body
  *       description: ph_number of user
  *       required: true
  *       schema: 
  *         type: string
  *     - name: password  
  *       in: body
  *       description: password of user
  *       required: true
  *       schema: 
  *         type: string
  *     - name: problem_category
  *       in: body
  *       description: problem_category of user. guid of problem_category
  *       required: true
  *       schema: 
  *         type: string
  *     - name: type
  *       in: body
  *       description: type of user. USER | NGO | COUSALER
  *       required: true
  *       schema:
  *         type: string
  *     - name: first_name
  *       in: body
  *       description: first_name of user. Required if type USER | COUNSALER.
  *       required: false
  *       schema:
  *         type: string
  *     - name: middle_name
  *       in: body
  *       description: middle_name of user. Required if type USER | COUNSALER.
  *       required: false
  *       schema:
  *         type: string
  *     - name: last_name
  *       in: body
  *       description: last_name of user. Required if type USER | COUNSALER.
  *       required: false
  *       schema:
  *         type: string
  *     - name: name
  *       in: body
  *       description: name of user. Required if type NGO.
  *       required: false
  *       schema:
  *         type: string
  *     responses:
  *       201:
  *         description: send an email to the user with the verification link and register him
  */


router.post('/signUp', AuthController.signUp);

/**
  * @swagger
  * /login:
  *   post:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: email
  *       in: body
  *       description: email of user
  *       required: true
  *       schema: 
  *         type: string
  *     - name: password  
  *       in: body
  *       description: password of user
  *       required: true
  *       schema: 
  *         type: string
  *     responses:
  *       200:
  *         description: user logged in succesfully
  */
router.post('/login', AuthController.login);

/**
  * @swagger
  * /verify/{uniqueString}:
  *   get:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: uniqueString
  *       in: path
  *       description: uniqueString containing id of user
  *       required: true
  *       schema: 
  *         type: string
  *     responses:
  *       200:
  *         description: user verified and activated in succesfully
  */
router.get('/verify/:uniqueString', AuthController.verify);

/**
  * @swagger
  * /resendVerificationLink/{email}:
  *   get:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: email
  *       in: path
  *       description: email of user
  *       required: true
  *       schema: 
  *         type: string
  *     responses:
  *       200:
  *         description: user verified and activated in succesfully
  */
router.get('/resendVerificationLink/:email', AuthController.resendVerificationLink);

/**
  * @swagger
  * /resetPswd/{email}:
  *   post:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: email
  *       in: path
  *       description: email of user
  *       required: true
  *       schema: 
  *         type: string
  *     - name: password
  *       in: body
  *       description: password of user
  *       required: true
  *       schema: 
  *         type: string
  *     responses:
  *       200:
  *         description: user verified and activated in succesfully
  */
router.post('/resetPswd/:email', AuthController.resetPswd);


/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Auth
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: access_token
 *       description: access_token of logged in user
 *       in: header
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: log out from application
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.post('/logout', auth.isAuthunticated, AuthController.logOut);

module.exports = router;
