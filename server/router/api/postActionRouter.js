const router = require('express').Router();
// const postActionController = require('../../controllers/PostActionController');
// const AuthController = require('../../controllers/AuthController');
const postActionController = require('../../controllers/PostsActionController');
const auth = require('../../utils/auth');

// LIKES

/**
* @swagger
* /postAction/like/id={id}:
*   post:
*     tags:
*       - post_action
*     description: like a post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
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
*         description: Return a likes record created
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.post('/like/id=:id', auth.isAuthunticated, postActionController.likePost);

/**
* @swagger
* /postAction/likes/id={id}:
*   get:
*     tags:
*       - post_action
*     description: get likes on post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of post.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: lastRank
*        description: lastRank of records fetched. If -1 then latest records will be fetched. It is used for pagination
*        in: body
*        required: true
*        schema: 
*          type: integer
*     responses:
*       200:
*         description: Return a likes on post
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.get('/likes/id=:id', auth.isAuthunticated, postActionController.getLikes);


/**
* @swagger
* /postAction/unlike/id={id}:
*   delete:
*     tags:
*       - post_action
*     description: unlike a post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of like record.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: Return a likes record deleted
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.delete('/unlike/id=:id', auth.isAuthunticated, postActionController.unlikePost);

//COMMENTS

/**
* @swagger
* /postAction/comment/id={id}:
*   post:
*     tags:
*       - post_action
*     description: comment on a post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of post.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: comment
*        description: comment of post.
*        in: body
*        required: true
*        schema:
*         type: string
*     responses:
*       200:
*         description: Return a comment record created
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.post('/comment/id=:id', auth.isAuthunticated, postActionController.commentPost);

/**
* @swagger
* /postAction/comment/id={id}:
*   put:
*     tags:
*       - post_action
*     description: comment on a post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of post.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: comment
*        description: comment of post.
*        in: body
*        required: true
*        schema:
*         type: string
*     responses:
*       200:
*         description: Return a comment record created
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.put('/comment/id=:id', auth.isAuthunticated, postActionController.updateCommentPost);

/**
* @swagger
* /postAction/comments/id={id}:
*   get:
*     tags:
*       - post_action
*     description: get comments on post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of post.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: lastRank
*        description: lastRank of records fetched. If -1 then latest records will be fetched. It is used for pagination
*        in: body
*        required: true
*        schema: 
*          type: integer
*     responses:
*       200:
*         description: Return a comments on post
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.get('/comments/id=:id', auth.isAuthunticated, postActionController.getComments);


/**
* @swagger
* /postAction/comment/id={id}:
*   delete:
*     tags:
*       - post_action
*     description: delete comment on a post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of comment record.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: Return a comment record deleted
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.delete('/comment/id=:id', auth.isAuthunticated, postActionController.deleteCommentPost);

// SHARES

/**
* @swagger
* /postAction/share/id={id}:
*   post:
*     tags:
*       - post_action
*     description: share a post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of post.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: shared_on
*        description: platform on which post is shared.
*        in: body
*        required: true
*        schema:
*         type: string
*      - name: share_link
*        description: url which is shared.
*        in: body
*        required: true
*        schema:
*         type: string
*         format: url
*     responses:
*       200:
*         description: Return a share record created
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.post('/share/id=:id', auth.isAuthunticated, postActionController.sharePost);

/**
* @swagger
* /postAction/shares/id={id}:
*   get:
*     tags:
*       - post_action
*     description: get shares on post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of post.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*      - name: lastRank
*        description: lastRank of records fetched. If -1 then latest records will be fetched. It is used for pagination
*        in: body
*        required: true
*        schema: 
*          type: integer
*     responses:
*       200:
*         description: Return a shares on post
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.get('/shares/id=:id', auth.isAuthunticated, postActionController.getShares);

// ATTACHMENTS

/**
* @swagger
* /postAction/attachments/id={id}:
*   delete:
*     tags:
*       - post_action
*     description: delete attachment on a post
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of attachments record.
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: Return a attachments record deleted
*         schema:
*           $ref: '#/definitions/post_action'
*/
router.delete('/attachments/id=:id', auth.isAuthunticated, postActionController.deleteAttachment);
// router.post('/feed', auth.isAuthunticated, postController.getPosts);

module.exports = router;
