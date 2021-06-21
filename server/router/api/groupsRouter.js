const router = require('express').Router();
// const AuthController = require('../../controllers/AuthController');
const GroupsController = require('../../controllers/GroupsController');
const auth = require('../../utils/auth');
/**
   * @swagger
   * definitions:
   *   users:
   *     required:
   *       - id
   *       - username
   *       - email
   *     properties:
   *       id:
   *         type: integer
   *       username:
   *         type: string
   *       email:
   *         type: string
   */


/**
 * @swagger
 * /users/{userId}:
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
 *        description: numeric id of the user to get
 *        in: path
 *        required: true
 *        type: integer
 *        minimum: 1
 *     responses:
 *       200:
 *         description: a single user object
 *         schema:
 *           $ref: '#/definitions/users'
 */
// router.get('/:id', auth.isAuthunticated, GroupsController.getUserById);
router.get('/id=:id', auth.isAuthunticated, GroupsController.getGroupById);
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: numeric id of the user to get
 *        in: path
 *        required: true
 *        type: integer
 *        minimum: 1
 *     responses:
 *       200:
 *         description: delete user with id
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.delete('/id=:id', auth.isAuthunticated, GroupsController.deleteById);
router.put('/id=:id', auth.isAuthunticated, GroupsController.activateById);

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

router.get('/profile/id=:id', auth.isAuthunticated, GroupsController.getProfileGroup)
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
router.put('/updateProfile/id=:id', auth.isAuthunticated, GroupsController.updateGroup);
router.post('/create', auth.isAuthunticated, GroupsController.createGroup);
router.post('/user/id=:id', auth.isAuthunticated, GroupsController.groupsList);
// router.post('/addMember', auth.isAuthunticated, GroupsController.addGroupMember);


module.exports = router;
