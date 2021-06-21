const router = require('express').Router();
const { GroupMembers } = require('../../controllers/GroupsMemberController');
// const AuthController = require('../../controllers/AuthController');
const GroupMemberController = require('../../controllers/GroupsMemberController');
const auth = require('../../utils/auth');
// const gmc = new GroupMemberController(10)
// console.log("take" + gmc.take);


/**
 * @swagger
 * /groupMembers/id={Id}:
 *   post:
 *     tags:
 *       - groupMembers
 *     description: Return a group members of group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group
 *        in: path
 *        required: true
 *        type: string
 *        minimum: 30
 *      - name: skip
 *        description: pagination offset
 *        in: body
 *        required: true
 *        type: integer
 *        minimum: 0
 *      - name: take
 *        description: limit of records
 *        in: body
 *        required: true
 *        type: integer
 *        minimum: 0
 *      - name: is_admin
 *        description: admin status of members
 *        in: body
 *        required: true
 *        type: boolean
 *     responses:
 *       200:
 *         description: List of groupMembers
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
 router.post('/groupMembers/id=:id',auth.isAuthunticated,GroupMemberController.GroupMembers);
/**
 * @swagger
 * /addMember/id={Id}:
 *   post:
 *     tags:
 *       - groupMembers
 *     description: add a group member
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group member request
 *        in: path
 *        required: true
 *        type: string
 *        minimum: 30
 *     responses:
 *       200:
 *         description: add group member
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */

 router.post('/addMember/id=:id',auth.isAuthunticated,GroupMemberController.addGroupMember);
 
 /**
 * @swagger
 * /id={Id}:
 *   delete:
 *     tags:
 *       - groupMembers
 *     description: delete a group member
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group member
 *        in: path
 *        required: true
 *        type: string
 *        minimum: 30
 *     responses:
 *       200:
 *         description: delete a group 
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
 router.delete('/id=:id',auth.isAuthunticated, GroupMemberController.deleteGroupMember);
 /**
 * @swagger
 * /block/id={Id}:
 *   put:
 *     tags:
 *       - groupMembers
 *     description:  block a group member
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group member
 *        in: path
 *        required: true
 *        type: string
 *        minimum: 30
 *     responses:
 *       200:
 *         description: block a group member
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
 router.put('/block/id=:id',auth.isAuthunticated, GroupMemberController.blockGroupMember);
 /**
 * @swagger
 * /activate/id={Id}:
 *   put:
 *     tags:
 *       - groupMembers
 *     description:  activate a group member
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group member
 *        in: path
 *        required: true
 *        type: string
 *        minimum: 30
 *     responses:
 *       200:
 *         description: activate a group member
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
 router.put('/activate/id=:id',auth.isAuthunticated, GroupMemberController.activeGroupMember);
  /**
 * @swagger
 * /update/id={Id}:
 *   put:
 *     tags:
 *       - groupMembers
 *     description:  update a group member
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group member
 *        in: path
 *        required: true
 *        type: string
 *        minimum: 30
 *     responses:
 *       200:
 *         description: update a group member
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
 router.put('/update/id=:id',auth.isAuthunticated, GroupMemberController.updateGroupMember);

 /****************************************
  * 
  * Group Member Request
  * 
  */
  /**
 * @swagger
 * /addReq:
 *   post:
 *     tags:
 *       - groupMembers
 *       - groupMemberRequest
 *     description:  add a group member request
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: group_id
 *        description: group_id of req
 *        in: body
 *        required: true
 *        type: string
 *        minimum: 30
 *      - name: request_reciever
 *        description: request_reciever of req
 *        in: body
 *        required: true
 *        type: string
 *        minimum: 30
 *     responses:
 *       200:
 *         description:  add a group member request
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
  router.post('/addReq',auth.isAuthunticated,GroupMemberController.addGroupMemberReq);
/**
 * @swagger
 * /deleteReq:
 *   post:
 *     tags:
 *       - groupMembers
 *       - groupMemberRequest
 *     description:  delete a group member request
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of req
 *        in: path
 *        required: true
 *        type: string
 *        minimum: 30
 *      - name: request_reciever
 *        description: id of request_reciever
 *        in: body
 *        required: true
 *        type: string
 *        minimum: 30
 *     responses:
 *       200:
 *         description: delete a group member request
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
  router.post('/deleteReq/id=:id',auth.isAuthunticated,GroupMemberController.deleteGroupMemberReq);
  /**
 * @swagger
 * /groupMemberReq/id={Id}:
 *   get:
 *     tags:
 *       - groupMembers
 *     description: Return a group members request of group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of group
 *        in: path
 *        required: true
 *        type: string
 *        minimum: 30
 *      - name: skip
 *        description: pagination offset
 *        in: body
 *        required: true
 *        type: integer
 *        minimum: 0
 *      - name: take
 *        description: limit of records
 *        in: body
 *        required: true
 *        type: integer
 *        minimum: 0
 *     responses:
 *       200:
 *         description: Return a group members request of group
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
  router.post('/groupMemberReq/id=:id',auth.isAuthunticated,GroupMemberController.GroupMemberRequests);
  /**
 * @swagger
 * /groupReq/id={Id}:
 *   get:
 *     tags:
 *       - groupMembers
 *     description: Return a group members req of user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: skip
 *        description: pagination offset
 *        in: body
 *        required: true
 *        type: integer
 *        minimum: 0
 *      - name: take
 *        description: limit of records
 *        in: body
 *        required: true
 *        type: integer
 *        minimum: 0
 *     responses:
 *       200:
 *         description: Return a group members req of user
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
  router.post('/groupReq',auth.isAuthunticated,GroupMemberController.GroupRequests);

/**
 * @swagger
 * /isGroupMember:
 *   post:
 *     tags:
 *       - groupMembers
 *     description: Return a member status of group
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: group_id
 *        description: id of group
 *        in: body
 *        required: true
 *        type: string
 *        minimum: 30
 *      - name: user_id
 *        description: id of user
 *        in: body
 *        required: true
 *        type: string
 *        minimum: 30
 *     responses:
 *       200:
 *         description: Return a member status of group
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
//  router.post('/isGroupMember',auth.isAuthunticated,GroupMemberController.isGroupMember);

  module.exports = router;
