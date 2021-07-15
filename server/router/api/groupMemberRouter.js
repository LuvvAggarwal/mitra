const router = require('express').Router();
const { GroupMembers } = require('../../controllers/GroupsMemberController');
// const AuthController = require('../../controllers/AuthController');
const GroupMemberController = require('../../controllers/GroupsMemberController');
const auth = require('../../utils/auth');
// const gmc = new GroupMemberController(10)
// console.log("take" + gmc.take);


/**
 * @swagger
 * /groupMember/groupMembers/id={id}:
 *   post:
 *     tags:
 *       - group_members
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
 *        schema: 
 *          type: string
 *          format: uuid
 *      - name: lastNumber
 *        description: lastNumber of records fetched. If -1 then latest records will be fetched. It is used for pagination
 *        in: body
 *        required: true
 *        schema: 
 *          type: integer
 *      - name: is_admin
 *        description: admin status of members
 *        in: body
 *        required: true
 *        schema:
 *         type: boolean
 *     responses:
 *       200:
 *         description: List of groupMembers
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
router.post('/groupMembers/id=:id', auth.isAuthunticated, GroupMemberController.GroupMembers);
/**
 * @swagger
 * /groupMember/addMember/id={Id}:
 *   post:
 *     tags:
 *       - group_members
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
 *        schema:
 *         type: string
 *         format: uuid
 *     responses:
 *       200:
 *         description: add group member
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */

router.post('/addMember/id=:id', auth.isAuthunticated, GroupMemberController.addGroupMember);

/**
* @swagger
* /groupMember/id={Id}:
*   delete:
*     tags:
*       - group_members
*     description: delete a group member
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*      - name: id
*        description: id of group member record
*        in: path
*        required: true
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: delete a group 
*         schema:
*           $ref: '#/definitions/groupMember'
*/
router.delete('/id=:id', auth.isAuthunticated, GroupMemberController.deleteGroupMember);
/**
* @swagger
* /groupMember/block/id={Id}:
*   put:
*     tags:
*       - group_members
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
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: block a group member
*         schema:
*           $ref: '#/definitions/groupMember'
*/
router.put('/block/id=:id', auth.isAuthunticated, GroupMemberController.blockGroupMember);
/**
* @swagger
* /groupMember/activate/id={Id}:
*   put:
*     tags:
*       - group_members
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
 *        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: activate a group member i.e, unblock
*         schema:
*           $ref: '#/definitions/groupMember'
*/
router.put('/activate/id=:id', auth.isAuthunticated, GroupMemberController.activeGroupMember);
/**
* @swagger
* /groupMember/update/id={Id}:
*   put:
*     tags:
*       - group_members
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
*        schema:
*         type: string
*         format: uuid
*      - name: is_admin
*        description: is_admin status of group member
*        in: body
*        required: true
*        schema:
*         type: boolean
*     responses:
*       200:
*         description: update a group member
*         schema:
*           $ref: '#/definitions/groupMember'
*/
router.put('/update/id=:id', auth.isAuthunticated, GroupMemberController.updateGroupMember);

/****************************************
 * 
 * Group Member Request
 * 
 */
/**
* @swagger
* /groupMember/addReq:
*   post:
*     tags:
*       - group_member_requests
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
*        schema:
*         type: string
*         format: uuid
*      - name: request_reciever
*        description: request_reciever of req
*        in: body
*        required: true
*        schema:
*         type: string
*         format: uuid
*     responses:
*       200:
*         description:  add a group member request
*         schema:
*           $ref: '#/definitions/groupMember'
*/
router.post('/addReq', auth.isAuthunticated, GroupMemberController.addGroupMemberReq);
/**
 * @swagger
 * /groupMember/req:
 *   delete:
 *     tags:
 *       - group_member_requests
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
 *        schema:
 *         type: string
 *         format: uuid
 *      - name: request_reciever
 *        description: id of request_reciever
 *        in: body
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *     responses:
 *       200:
 *         description: delete a group member request
 *         schema:
 *           $ref: '#/definitions/groupMember'
 */
router.delete('/req/id=:id', auth.isAuthunticated, GroupMemberController.deleteGroupMemberReq);
/**
* @swagger
* /groupMember/groupMemberReq/id={Id}:
*   post:
*     tags:
*       - group_member_requests
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
*         description: Return a group members request of group
*         schema:
*           $ref: '#/definitions/groupMember'
*/
router.post('/groupMemberReq/id=:id', auth.isAuthunticated, GroupMemberController.GroupMemberRequests);
/**
* @swagger
* /groupMember/groupReq/id={Id}:
*   post:
*     tags:
*       - group_member_requests
*     description: Return a group members req of user
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
*         description: Return a group members req of user
*         schema:
*           $ref: '#/definitions/groupMember'
*/
router.post('/groupReq', auth.isAuthunticated, GroupMemberController.GroupRequests);


module.exports = router;
