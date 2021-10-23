const router = require('express').Router();
// const AuthController = require('../../controllers/AuthController');
const followerFollowingController = require('../../controllers/FollowerFollowingController');
const auth = require('../../utils/auth');

/**
 * @swagger
 * /follow/{id}:
 *   post:
 *     tags:
 *       - follower_following
 *     description: follow a user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of user to follow
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *          format: uuid
 *     responses:
 *       200:
 *         description: follower_following record
 *         schema:
 *           $ref: '#/definitions/follower_following'
 */
router.post('/:id', auth.isAuthunticated, followerFollowingController.follow);

/**
 * @swagger
 * /follow/{id}:
 *   delete:
 *     tags:
 *       - follower_following
 *     description: unfollow a user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of follower_following record
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *          format: uuid
 *     responses:
 *       200:
 *         description: follower_following record
 *         schema:
 *           $ref: '#/definitions/follower_following'
 */
router.delete('/:id', auth.isAuthunticated, followerFollowingController.unfollow);

/**
 * @swagger
 * /follow/getFollowing:
 *   post:
 *     tags:
 *       - follower_following
 *     description: Return following of user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: lastNumber
 *        description: lastNumber of records fetched. If -1 then latest records will be fetched. It is used for pagination
 *        in: body
 *        required: true
 *        schema: 
 *          type: integer
 *     responses:
 *       200:
 *         description: List of users whome the user follows
 *         schema:
 *           $ref: '#/definitions/follower_following'
 */
router.get('/getFollowing/:user/:lastNumber', auth.isAuthunticated, followerFollowingController.getFollowing);

/**
 * @swagger
 * /follow/getFollower:
 *   post:
 *     tags:
 *       - follower_following
 *     description: Return followers of user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: lastNumber
 *        description: lastNumber of records fetched. If -1 then latest records will be fetched. It is used for pagination
 *        in: body
 *        required: true
 *        schema: 
 *          type: integer
 *     responses:
 *       200:
 *         description: List of users who are following the user
 *         schema:
 *           $ref: '#/definitions/follower_following'
 */
router.get('/getFollower/:user/:lastNumber', auth.isAuthunticated, followerFollowingController.getFollowers);

module.exports = router;
