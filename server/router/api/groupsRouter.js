const router = require('express').Router();
// const AuthController = require('../../controllers/AuthController');
const GroupsController = require('../../controllers/GroupsController');
const auth = require('../../utils/auth');
// const multer = require("multer")
const { uploadIamge } = require("../../utils/multerUtil")

const profile = uploadIamge.fields([
   {
      name: 'profile_photo', maxCount: 1
   },
   {
      name: 'cover_photo', maxCount: 1
   }
])

/**
 * @swagger
 * /groups/id={id}:
 *   get:
 *     tags:
 *       - groups
 *     description:  get a group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *     responses:
 *       200:
 *         description: get a group
 *         schema:
 *           $ref: '#/definitions/groups'
 */
router.get('/id=:id', auth.isAuthunticated, GroupsController.getGroupById);

/**
 * @swagger
 * /groups/id={id}:
 *   delete:
 *     tags:
 *       - groups
 *     description: delete a group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *     responses:
 *       200:
 *         description: delete a group
 *         schema:
 *           $ref: '#/definitions/groups'
 */
router.delete('/id=:id', auth.isAuthunticated, GroupsController.deleteGroupById);

/**
 * @swagger
 * /groups/profile/{group_id}:
 *   get:
 *     tags:
 *       - groups
 *     description: profile of a group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: group_id
 *        description: group_id of group
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *     responses:
 *       200:
 *         description: profile of a group
 *         schema:
 *           $ref: '#/definitions/groups'
 */
//  router.get('/profile/:group_id', auth.isAuthunticated, GroupsController.getProfile)


/**
 * @swagger
 * /groups/profile/id={id}:
 *   get:
 *     tags:
 *       - groups
 *     description: profile of a group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *     responses:
 *       200:
 *         description: profile of a group
 *         schema:
 *           $ref: '#/definitions/groups'
 */
router.get('/profile/id=:id', auth.isAuthunticated, GroupsController.getProfileGroup)

/**
 * @swagger
 * /groups/id={id}:
 *   put:
 *     tags:
 *       - groups
 *     description: updates a group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *      - name: id
 *        description: id of group
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *      - name: name
 *        description: name of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *      - name: email
 *        description: email of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *         format: email
 *      - name: ph_number
 *        description: ph_number of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *      - name: bio
 *        description: bio of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *      - name: problem_category
 *        description: problem_category of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *      - name: visibility
 *        description: visibility of the user. PUBLIC | PRIVATE | FRIENDS
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: profile_photo
 *        description: profile_photo of the user.
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: binary
 *      - name: cover_photo
 *        description: cover_photo of the user.
 *        in: body
 *        required: false
 *        schema:
 *          type: integer
 *          format: binary
 *     responses:
 *       200:
 *         description: updates a group
 *         schema:
 *           $ref: '#/definitions/groups'
 */
router.put('/id=:id', auth.isAuthunticated, profile, GroupsController.updateGroup);

/**
 * @swagger
 * /groups/create:
 *   post:
 *     tags:
 *       - groups
 *     description: creates a group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *      - name: id
 *        description: id of group
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *      - name: name
 *        description: name of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *      - name: email
 *        description: email of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *         format: email
 *      - name: ph_number
 *        description: ph_number of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *      - name: bio
 *        description: bio of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *      - name: problem_category
 *        description: problem_category of group
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *      - name: visibility
 *        description: visibility of the user. PUBLIC | PRIVATE | FRIENDS
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: profile_photo
 *        description: profile_photo of the user.
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: binary
 *      - name: cover_photo
 *        description: cover_photo of the user.
 *        in: body
 *        required: false
 *        schema:
 *          type: integer
 *          format: binary
 *     responses:
 *       200:
 *         description: updates a group
 *         schema:
 *           $ref: '#/definitions/groups'
 */
router.post('/create', auth.isAuthunticated, profile, GroupsController.createGroup);

/**
 * @swagger
 * /groups/user/id={id}:
 *   get:
 *     tags:
 *       - groups
 *     description: Return groups of user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *          format: uuid
 *      - name: lastNumber
 *        description: lastNumber of records fetched. If -1 then latest records will be fetched. It is used for pagination
 *        in: body
 *        required: true
 *        schema: 
 *          type: integer
 *     responses:
 *       200:
 *         description: List of groups of user
 *         schema:
 *           $ref: '#/definitions/group'
 */
router.get('/user/id=:id', auth.isAuthunticated, GroupsController.groupsList);

router.get('/groups/:q', auth.isAuthunticated, GroupsController.getGroups);


module.exports = router;
