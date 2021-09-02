const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
// const BaseController = require('./BaseController');
// const GroupMemberController = require("./GroupsMemberController");
const RequestHandler = require('../utils/RequestHandler');
const event = require("../config/events");
const data_type = require("../config/validations/dataTypes");
const take = require("../config/takeConfig");
const Logger = require('../utils/logger');
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { createId } = require('../utils/idUtil');
const BaseController = require('./BaseController');
const { last } = require('lodash');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
// const gm = new GroupMemberController(10);
// console.log(gm);
class notificationController extends BaseController {
	/*********************************************
	 * Param - req - post_id: req.params.id 
	 * Use - Post with full data -- INTERNAL
	 * Flow - 1 check if user is member
	 * 		  2 get post
	 */
	//YE INTERNALLY USE HONGE
	static async likeNotification(user, recipient, link_source) {
		try {
			const event_id = event.like_post.id;
			const event_msg = event.like_post.message;
			const message = user.name + " " + event_msg;
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			// console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

	static async commentNotification(user, recipient, link_source) {
		try {
			const event_id = event.comment_post.id;
			const event_msg = event.comment_post.message;
			const message = user.name + " " + event_msg;
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			// console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

	static async shareNotification(user, recipient, link_source) {
		try {
			const event_id = event.share_post.id;
			const event_msg = event.share_post.message;
			const message = user.name + " " + event_msg;
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			// console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

	//GROUP NOTIFICATIONS

	static async newFollowNotification(user, recipient, link_source) {
		try {
			const event_id = event.new_follow.id;
			const event_msg = event.new_follow.message;
			const message = user.name + " " + event_msg;
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			// console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}
	static async groupMembershipRequestNotification(user, recipient, link_source) {
		try {
			const event_id = event.group_membership_request.id;
			const event_msg = event.group_membership_request.message;
			const message = user.name + " " + event_msg;
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			// console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}
	static async groupMembershipRequestAdminNotification(user, recipient, link_source) {
		try {
			const event_id = event.group_membership_request_admin.id;
			const event_msg = event.group_membership_request_admin.message;
			const message = user.name + " " + event_msg;
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			// console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}
	static async groupPostApprovedNotification(user, recipient, link_source) {
		try {
			const event_id = event.group_post_approved.id;
			const event_msg = event.group_post_approved.message;
			const message = event_msg;
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			// console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}


	static async groupMemberRequestAcceptedNotification(user, recipient, link_source, group_name) {
		try {
			const event_id = event.group_member_request_accepted.id;
			const event_msg = event.group_member_request_accepted.message;
			const message = event_msg + " " + group_name + ".";
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

	static async messageNotification(user, recipient, link_source) {
		try {
			const event_id = event.message.id;
			const event_msg = event.message.message;
			const message = user.name + " " + event_msg;
			// EFFECTIVE QUERY HANDLING
			const data = {
				sender: user.id,
				recipient, message, link_source,
				event: event_id,
				seen: false
			}
			console.log("checking");
			data.id = uuid.v4() ;
			// console.log(options);
			const result = await super.create({}, 'notifications', data);
			return result;
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

	static async getNotifications(req, res) {
		try {
			const user = req.decoded.payload.id;
			const lastNumber = req.body.lastNumber;
			const takeNotification = req.body.takeNotification
			// const user = req.decoded.payload.id;
			const schema = {
				id: data_type.id,
				lastNumber: data_type.integer,
				takeNotification: data_type.take_notification
			};
			const { error } = Joi.validate({ id: user, lastNumber, takeNotification }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			console.log(user);
			// EFFECTIVE QUERY HANDLING
			const query = {
				take: 10,
				where: {
					recipient: user,
					seen: false,
					active: true,
				},
				orderBy: {
					number: "desc"
				},
				select: {
					id: true,
					number: true,
					message: true,
					link_source: true,
					recipient_user: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							// bio: true,
						}
					},
					sender_users: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							// bio: true,
						}
					},
				}
			}
			console.log("checking");
			if (lastNumber > -1) {
				query.where.number = {
					lt: lastNumber
				}
			}
			console.log(query);
			// console.log(options);
			const payload = await super.getList	(req, 'notifications', query);
			console.log(payload);
			return requestHandler.sendSuccess(res, "Notification fetched successfully", 200)({payload});
		} catch (error) {
			return requestHandler.sendError(req,res,err)
		}
	}

	static async seenNotifications(req, res) {
		try {
			const records = req.body.notifications;
			// const lastNumber = req.body.lastNumber;
			// const takeNotification = req.body.takeNotification
			// const user = req.decoded.payload.id;
			const schema = {
				records: data_type.array_id
			};
			const { error } = Joi.validate({ records }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// EFFECTIVE QUERY HANDLING
			const data = {
				where: {
					id: { in: records },
				},
				data: {
					seen: true,
					active: false,
					updated_on: new Date().toISOString()
				}
			}
			console.log("checking");

			// console.log(options);
			const payload = await super.updateMany(req, 'notifications', data);
			return requestHandler.sendSuccess(res, "Notification updated successfully", 200)({payload});
		} catch (error) {
			return requestHandler.sendError(req,res,err)
		}
	}

}

module.exports = notificationController;
