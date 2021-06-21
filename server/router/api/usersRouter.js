const router = require('express').Router();
// const AuthController = require('../../controllers/AuthController');
const UsersController = require('../../controllers/UsersController');
const auth = require('../../utils/auth');

/**
 * @swagger
 * /users/id={userId}:
 *   get:
 *     tags:
 *       - users
 *     description: Return a specific user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: uuid of the user to get
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: a single user object
 *         schema:
 *           $ref: '#/definitions/users'
 */
// router.get('/:id', auth.isAuthunticated, UsersController.getUserById);
 router.get('/id=:id',auth.isAuthunticated,UsersController.getUserById);

/**
 * @swagger
 * /users/id={userId}:
 *   delete:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: delete the user
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: delete user with id
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.delete('/id=:id',auth.isAuthunticated, UsersController.deleteById);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return the user profile
 *         schema:
 *           $ref: '#/definitions/users'
 */

router.get('/profile', auth.isAuthunticated, UsersController.getProfile)

/**
 * @swagger
 * /users/updateProfile:
 *   get:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: updste the user profile
 *         schema:
 *           $ref: '#/definitions/users'
 */
 router.post('/updateProfile', auth.isAuthunticated, UsersController.updateProfile);


module.exports = router;
