const router = require('express').Router();
// const { attachments } = require('../../config/takeConfig');/
// const AuthController = require('../../controllers/AuthController');
const postController = require('../../controllers/PostsController');
const auth = require('../../utils/auth');
const { upload } = require('../../utils/multerUtil');

/**
* @swagger
* /post/feed:
*   post:
*     tags:
*       - post
*     description: get feeds of user
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: lastRank
*        description: lastRank of records fetched. If -1 then latest records will be fetched. It is used for pagination
*        in: body
*        required: true
*        schema: 
*          type: integer
*     responses:
*       200:
*         description: Return a posts for user
*         schema:
*           $ref: '#/definitions/post'
*/
router.get('/feed/:lastRank/:take', auth.isAuthunticated, postController.getFeed);

/**
* @swagger
* /post/myPosts:
*   post:
*     tags:
*       - post
*     description: get my posts
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
*         description: Return my posts
*         schema:
*           $ref: '#/definitions/post'
*/
router.get('/user/id=:id/ln=:lastNumber', auth.isAuthunticated, postController.getUserPosts);

/**
* @swagger
* /post/popular:
*   post:
*     tags:
*       - post
*     description: get popular posts
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: lastRank
*        description: lastRank of records fetched. If -1 then latest records will be fetched. It is used for pagination
*        in: body
*        required: true
*        schema: 
*          type: integer
*     responses:
*       200:
*         description: Return popular posts
*         schema:
*           $ref: '#/definitions/post'
*/
router.get('/popular/:lastRank', auth.isAuthunticated, postController.getPopular);

router.get('/search/:q/:lastRank', auth.isAuthunticated, postController.getSearchedPost);

/**
* @swagger
* /post/group/id={id}:
*   post:
*     tags:
*       - post
*     description: get my posts
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
*      - name: lastNumber
*        description: lastNumber of records fetched. If -1 then latest records will be fetched. It is used for pagination
*        in: body
*        required: true
*        schema: 
*          type: integer
*     responses:
*       200:
*         description: Return group posts
*         schema:
*           $ref: '#/definitions/post'
*/

router.get('/group/id=:id/:lastNumber', auth.isAuthunticated, postController.getGroupPosts);


/**
* @swagger
* /post/id={id}:
*   get:
*     tags:
*       - post
*     description: get post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of post
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: Return post
*         schema:
*           $ref: '#/definitions/post'
*/
router.get('/id=:id', auth.isAuthunticated, postController.getPostById);

/**
* @swagger
* /post/id={id}:
*   delete:
*     tags:
*       - post
*     description: get post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of post
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: Return post deleted
*         schema:
*           $ref: '#/definitions/post'
*/
router.delete('/id=:id', auth.isAuthunticated, postController.deletePostById);
/**
* @swagger
* /post/create:
*   post:
*     tags:
*       - post
*     description: create post
*     security:
*       - Bearer: []
*     produces:
*       - multipart/form-data
*     parameters:
*      - name: title
*        description: title of post
*        in: body
*        required: true
*        schema:
*         type: string
*      - name: description
*        description: description of post
*        in: body
*        required: true
*        schema:
*         type: string
*         format: email
*      - name: type
*        description: type of post. Value can be /TEXT|MULTIMEDIA|DOCUMENT/
*        in: body
*        required: true
*        schema:
*         type: string
*      - name: category
*        description: category of post.
*        in: body
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: user_id
*        description: user_id of post.
*        in: body
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: group_id
*        description: group_id of post.
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
*      - name: attachments
*        description: attachments of the post. Attachment can be 5 and of these extension only /jpeg|jpg|png|gif|mkv|mp4|pdf|xlsx|docx/
*        in: body
*        required: true
*        schema:
*          type: array
*          items:
*           type: string
*           format: uuid
*     responses:
*       200:
*         description: Return post created
*         schema:
*           $ref: '#/definitions/post'
*/
router.post('/create', auth.isAuthunticated, upload.array("attachments"), postController.createPost);

/**
* @swagger
* /post/id={id}:
*   put:
*     tags:
*       - post
*     description: update post
*     security:
*       - Bearer: []
*     produces:
*       - multipart/form-data
*     parameters:
*      - name: id
*        description: id of post.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: title
*        description: title of post
*        in: body
*        required: true
*        schema:
*         type: string
*      - name: description
*        description: description of post
*        in: body
*        required: true
*        schema:
*         type: string
*         format: email
*      - name: type
*        description: type of post. Value can be /TEXT|MULTIMEDIA|DOCUMENT/
*        in: body
*        required: true
*        schema:
*         type: string
*      - name: category
*        description: category of post.
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
*     responses:
*       200:
*         description: Return post updated
*         schema:
*           $ref: '#/definitions/post'
*/
router.put('/id=:id', auth.isAuthunticated, postController.updatePost);

/**
* @swagger
* /post/id={id}:
*   put:
*     tags:
*       - post
*     description: approve post
*     security:
*       - Bearer: []
*     produces:
*       - multipart/form-data
*     parameters:
*      - name: id
*        description: id of post.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: Return post
*         schema:
*           $ref: '#/definitions/post'
*/

router.put('/approve/id=:id', auth.isAuthunticated, postController.approvePost);
// router.post('/feed', auth.isAuthunticated, postController.getPosts);

module.exports = router;
