const router = require('express').Router();
// const AuthController = require('../../controllers/AuthController');
const UsersController = require('../../controllers/UsersController');
const { uploadIamge } = require("../../utils/multerUtil")
const auth = require('../../utils/auth');
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
 * /users/id={id}:
 *   get:
 *     tags:
 *       - users
 *     description: Return a specific user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: uuid of the user to get
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
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
 * /users/id={id}:
 *   delete:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: delete the user
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: delete user with id
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.delete('/id=:id',auth.isAuthunticated, UsersController.deleteUserById);

/**
 * @swagger
 * /users/profile/{user_id}:
 *   get:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: user_id
 *        description: profile of the user
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: return the user profile
 *         schema:
 *           $ref: '#/definitions/users'
 */

 router.get('/profile/:user_id', auth.isAuthunticated, UsersController.getProfile)

/**
 * @swagger
 * /users/user_profile/id={id}:
 *   get:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: profile of the user of type USER
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: return the user profile
 *         schema:
 *           $ref: '#/definitions/users'
 */

router.get('/user_profile/id=:id', auth.isAuthunticated, UsersController.getUserProfile)

/**
 * @swagger
 * /users/ngo_profile/id={id}:
 *   get:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: profile of the user of type NGO
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: return the user profile
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.get('/ngo_profile/id=:id', auth.isAuthunticated, UsersController.getNgoProfile)

/**
 * @swagger
 * /users/counsaler_profile/id={id}:
 *   get:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: profile of the user of type COUNSALER
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: return the user profile
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.get('/counsaler_profile/id=:id', auth.isAuthunticated, UsersController.getCounsalerProfile)

/**
 * @swagger
 * /users/update:
 *   put:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *      - name: first_name
 *        description: first_name of the user of type USER | COUSALER
 *        in: body
 *        required: false
 *        schema:
 *          type: string
 *      - name: last_name
 *        description: last_name of the user of type USER | COUSALER
 *        in: body
 *        required: false
 *        schema:
 *          type: string
 *      - name: middle_name
 *        description: middle_name of the user of type USER | COUSALER
 *        in: body
 *        required: false
 *        schema:
 *          type: string
 *      - name: name
 *        description: name of the user
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: address
 *        description: address of the user.!Can be empty string.
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: ph_number
 *        description: ph_number of the user
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: occupation
 *        description: occupation of the user
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: bio
 *        description: bio of the user
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: problem_category
 *        description: problem_category of the user. UUID
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: city
 *        description: city of the user. UUID
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: visibility
 *        description: visibility of the user. PUBLIC | PRIVATE | FRIENDS
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: theme
 *        description: theme of the user. LIGHT | DARK
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: notification
 *        description: notification of the user. IMPORTANT | STANDARD | NO_NOTIFICATION
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: registration_code
 *        description: registration_code of the user. Required for NGO
 *        in: body
 *        required: false
 *        schema:
 *          type: string
 *      - name: help_type
 *        description: help_type of the user. Required for NGO | COUNSALER
 *        in: body
 *        required: false
 *        schema:
 *          type: string
 *      - name: experience
 *        description: experience of the user. Required for COUNSALER
 *        in: body
 *        required: false
 *        schema:
 *          type: integer
 *      - name: gender
 *        description: gender of the user. MALE | FEMALE | OTHER. Required for USER | COUNSALER.
 *        in: body
 *        required: false
 *        schema:
 *          type: string
 *      - name: profile_photo
 *        description: profile_photo of the user. Value can be /jpeg|jpg|png|gif/
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: binary
 *      - name: cover_photo
 *        description: cover_photo of the user. Value can be /jpeg|jpg|png|gif/
 *        in: body
 *        required: false
 *        schema:
 *          type: integer
 *          format: binary
 *     responses:
 *       200:
 *         description: update the user profile
 *         schema:
 *           $ref: '#/definitions/users'
 */
 router.put('/update', auth.isAuthunticated,profile, UsersController.updateProfile);


module.exports = router;
