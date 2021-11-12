const router = require('express').Router();
// const { attachments } = require('../../config/takeConfig');/
// const AuthController = require('../../controllers/AuthController');
const notificationController = require('../../controllers/NotificationController');
const auth = require('../../utils/auth');
// const { upload } = require('../../utils/multerUtil');

/**
 * @swagger
 * /notification/:
 *   get:
 *     tags:
 *       - notification
 *     description: notificatios of a user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: takeNotification
 *        description: number of records to take. Value can be notification | notification_full
 *        in: body
 *        required: true
 *        schema: 
 *          type: string
 *      - name: lastNumber
 *        description: lastNumber of records fetched. If -1 then latest records will be fetched. It is used for pagination
 *        in: body
 *        required: true
 *        schema: 
 *          type: integer
 *     responses:
 *       200:
 *         description: notifications of user
 *         schema:
 *           $ref: '#/definitions/notification'
 */
router.get('/', auth.isAuthunticated, notificationController.getNotifications);

/**
 * @swagger
 * /notification/seen:
 *   post:
 *     tags:
 *       - notification
 *     description: notificatios of a user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: notifications
 *        description: id of records to update as seen
 *        in: body
 *        required: true
 *        schema: 
 *          type: array
 *          items:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: updates notifications of user as seen
 *         schema:
 *           $ref: '#/definitions/notification'
 */
router.post('/seen', auth.isAuthunticated, notificationController.seenNotifications);

module.exports = router;
