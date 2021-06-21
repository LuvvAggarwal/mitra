const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
const BaseController = require('./BaseController');
// const GroupMemberController = require("./GroupMemberController");
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { createId } = require('../utils/idUtil');
// const { profile } = require('winston');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
// const gm = new GroupMemberController();
// console.log(gm);
class groupsMemberController extends BaseController {
	constructor() {
	}
	/*********************************************
	 * Param - req, res, data- {group_id,user_id}
	 * Use - Give member status of user.!!! Internally use ONLY
	 * Flow - 
	 * 			Model - group_member_map,
	 * 			Query - where: {
						active: true,
						user_id: user,
						group_id: group,
					}
				Return Obj - {id: if member, isMember: Boolean, isAdmin}
	 */

	static async isGroupMember(req, res, data) {
		try {
			const user = data.user_id;
			const group = data.group_id;
			const options = {
				where: {
					active: true,
					user_id: user,
					group_id: group,
				}
			}
			const obj = {};
			console.log('check');
			const member_check = await super.getByCustomOptions(req, 'group_member_map', options);
			console.log(member_check);
			if (member_check.active && member_check.id) {
				obj.id = member_check.id;
				obj.isMember = true;
				obj.isAdmin = member_check.is_admin;
			}
			else {
				obj.isMember = false;
				obj.isAdmin = member_check.is_admin;
			}
			console.log(obj);
			return obj;
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
	 * Param - req - id: req.params.id | Member Request Id
	 * Use - Add Group member from req
	 * Flow - 1 - Get Request Record 
	 * 		  2 - if not throw err
	 * 		  3 - Set user id => const user_id = req_data.is_acceptor_admin ? req_data.										request_sender : req_data.request_reciever;
	 * 		  4 - Create Member Map - 
	 * 		  5 - Update Req - request_accepted: true, member_id: id
	 */

	static async addGroupMember(req, res) {
		try {
			// const data = req.body;
			const schema = {
				id: Joi.string().required(),
				// group_id: Joi.string().required(),
			}
			const validate = {
				id: req.params.id,
				// group_id: data.group_id,
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const is_member = async (data) => {
			// 	await this.isGroupMember(req, res, data).bind(this);
			// }
			// const member_data = await is_member({ user_id: data.user_id, group: data.group_id });

			const req_data = await super.getById(req, "group_member_req", {
				id: req.params.id,
				active: true,
				request_accepted: false,
			})
			console.log(req_data);
			if (!req_data) {
				requestHandler.throwError(400, 'bad request', 'invalid request, not found')();
			}
			const user_id = req_data.is_acceptor_admin ? req_data.request_sender : req_data.request_reciever;

			const id = uuid.v4();
			const options = {
				id: id,
				user_id: user_id,
				group_id: req_data.group_id,
				is_admin: false
			}
			// const obj = {};
			const result = await super.create(req, 'group_member_map', options);
			console.log(result);
			const delete_req = await super.updateById(req, 'group_member_req', { request_accepted: true, member_id: id });
			console.log(delete_req);
			const payload = _.pick(result, ["id", "user_id", "group_id"])
			return requestHandler.sendSuccess(res, 'Group member added successfully')({ payload });;
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
	 * Param - req - id: req.params.id | Member Id
	 * Use - delete Group member
	 * Flow - 1 - Get Request Record 
	 * 		  2 - if not throw err
	 * 		  3 - Check if user is admin
	 * 		  4 - if - (!is_admin && user !== req_data.user_id) throw err
	 * 		  5 - if (req_data.user_id == user || is_admin) - success
	 * 		  6 - else throw err
	 */
	static async deleteGroupMember(req, res) {
		try {
			const data = req.body;
			const user = req.decoded.payload.id;
			const schema = {
				id: Joi.string().required(),
				// group_id: Joi.string().required(),
				// user_id: Joi.string().required()
			}
			const validate = {
				id: req.params.id,
				// group_id: data.group_id,
				// user_id: data.user_id
			}

			const options = {
				id: req.params.id,
				active: true
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const obj = {};

			// const is_member = async (data) => {
			// 	await this.isGroupMember(req, res, data);
			// }
			// const member_data = await is_member({ user_id: user, group_id: data.group_id });


			const req_data = await super.getById(req, "group_member_map", options)
			if (!req_data)
				requestHandler.throwError(400, 'bad request', 'Member record not found')();

			console.log(req_data);

			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			});

			console.log(is_admin);

			if (!is_admin && user !== req_data.user_id) {
				requestHandler.throwError(400, 'bad request', 'You cannot delete data')();
			}

			if (req_data.user_id == user || is_admin) {
				const result = await super.deleteByIdPermanent(req, 'group_member_map');
				const payload = _.pick(result, ["id", "user_id", "group_id"])
				return requestHandler.sendSuccess(res, 'You are no longer the group member')({ payload });
			} else {
				return requestHandler.throwError(400, 'bad request', 'You are not authorized to delete')();
			}
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}
	/*********************************************
	 * Param - req - id: req.params.id | Group Id
	 * 				skip, is_admin, take 
	 * Use - Return Group members
	 * Flow - 1 - Get List of Members of group
	 */
	static async GroupMembers(req, res) {
		try {
			// console.log("take " + this.take);
			const data = req.body;
			const schema = {
				// user_id: Joi.string().required(),
				group_id: Joi.string().required(),
				is_admin: Joi.boolean().required(),
				skip: Joi.number().required(),
				take: Joi.number().required(),
			}
			const validate = {
				skip: data.skip,
				group_id: req.params.id,
				take: data.take,
				is_admin: data.is_admin
			}
			const options = {
				skip: data.skip,
				take: data.take,
				where: {
					group_id: req.params.id,
					is_admin: data.is_admin
				}
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const obj = {};
			const payload = await super.getList(req, 'group_member_map', options);
			return requestHandler.sendSuccess(res, 'Group member List')({ payload });;
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}
	/*********************************************
	 * Param - req - id: req.params.id | Member Id
	 * Use - block Group member
	 * Flow - 1 - Get Request Record 
	 * 		  2 - if not throw err
	 * 		  3 - Check if user is admin
	 * 		  5 - if (req_data && is_admin) - success - update member - active: false
	 * 		  6 - else throw err
	 */
	static async blockGroupMember(req, res) {
		try {
			const id = req.params.id;
			const user = req.decoded.payload.id;
			console.log(user);
			const schema = {
				id: Joi.string().required(),
			}
			const validate = {
				id: id
			}

			const options = {
				id: req.params.id,
				active: true
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const obj = {};

			// const is_member = async (data) => {
			// 	await this.isGroupMember(req, res, data);
			// }
			// const member_data = await is_member({ user_id: user, group_id: data.group_id });
			const req_data = await super.getById(req, "group_member_map", options)
			if (!req_data) {
				requestHandler.throwError(400, 'bad request', 'Member not found')();
			}
			console.log(req_data);

			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			})
			console.log(is_admin);
			if (!is_admin) {
				requestHandler.throwError(400, 'bad request', 'You cannot block data')();
			}


			if (req_data && is_admin) {
				const result = await super.deleteById(req, 'group_member_map');
				const payload = _.omit(result, ["created_on", "updated_on", " number"])
				return requestHandler.sendSuccess(res, 'You are no longer the group member')({ payload });
			} else {
				return requestHandler.throwError(400, "bad request", "You are not authorized to delete")
			}
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
	 * Param - req - id: req.params.id | Member Id
	 * Use - active Group member
	 * Flow - 1 - Get Request Record 
	 * 		  2 - if not throw err
	 * 		  3 - Check if user is admin
	 * 		  5 - if (req_data && is_admin) - success - update member - active: true
	 * 		  6 - else throw err
	 */

	static async activeGroupMember(req, res) {
		try {
			const id = req.params.id;
			const user = req.decoded.payload.id;
			const schema = {
				id: Joi.string().required(),
			}
			const validate = {
				id: id
			}

			const options = {
				id: req.params.id,
				active: false
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const obj = {};

			// const is_member = async (data) => {
			// 	await this.isGroupMember(req, res, data);
			// }
			// const member_data = await is_member({ user_id: user, group_id: data.group_id });
			const req_data = await super.getById(req, "group_member_map", options)
			if (!req_data) {
				requestHandler.throwError(400, 'bad request', 'Member not found')();
			}
			console.log(req_data);

			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			})
			console.log(is_admin);
			if (!is_admin) {
				requestHandler.throwError(400, 'bad request', 'You cannot activate data')();
			}


			// console.log(req_data);
			if (req_data && is_admin) {
				const result = await super.updateById(req, 'group_member_map', { active: true });
				const payload = _.pick(result, ["id", "user_id", "group_id"])
				return requestHandler.sendSuccess(res, 'You have activated group member')({ payload });
			} else {
				return requestHandler.sendError(req, res, { message: "You are not authorized to delete" })
			}
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
	 * Param - req - id: req.params.id | Member Request Id
	 * 		   is_admin: req.body.is_admin
	 * Use - update Group member is_admin true || false
	 * Flow - 1 - Get Request Record 
	 * 		  2 - if not throw err
	 * 		  3 - Check if user is admin
	 * 		  5 - if (req_data && is_admin) - success - update member - is_admin: req.body.is_admin
	 * 		  6 - else throw err
	 */

	static async updateGroupMember(req, res) {
		try {
			const id = req.params.id;
			const user = req.decoded.payload.id;
			const schema = {
				id: Joi.string().required(),
				is_admin: Joi.boolean().required()
			}
			const validate = {
				id: id,
				is_admin: req.body.is_admin
			}

			const options = {
				id: req.params.id,
				active: true
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const obj = {};

			// const is_member = async (data) => {
			// 	await this.isGroupMember(req, res, data);
			// }
			// const member_data = await is_member({ user_id: user, group_id: data.group_id });

			const req_data = await super.getById(req, "group_member_map", options)
			if (!req_data) {
				requestHandler.throwError(400, 'bad request', 'Member not found')();
			}
			console.log(req_data);

			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			})
			console.log(is_admin);
			if (!is_admin) {
				requestHandler.throwError(400, 'bad request', 'You cannot update data')();
			}

			if (req_data && is_admin) {
				const result = await super.updateById(req, 'group_member_map', { is_admin: req.body.is_admin });
				const payload = _.pick(result, ["id", "user_id", "group_id"])
				return requestHandler.sendSuccess(res, 'You have activated group member')({ payload });
			} else {
				return requestHandler.sendError(req, res, { message: "You are not authorized to delete" })
			}
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/****************************************************
	 * Group member request
	 */

/*********************************************
 * Param - req - id: req.params.id | Member Request Id
 * 		   group_id : body | id of group
 * 		   request_reciever : body | id of user
 * 		   request_sender : body | id of current user
 * Use - add Group member req
 * Flow - 1 - Check sender and reciever 
 * 		  2 - if( no sender )
 * 			  check req_data
 * 			  if (found) throw err
 * 			  create req - request_accepted = false | is_acceptor_admin = true
 * 		  3 - if( no reciever )
 * 			  check req_data
 * 			  if (found) throw err
 * 			  create req - request_accepted = false | is_acceptor_admin = true
 * 		  4 - if(sender && reciever) throw err
 */
	static async addGroupMemberReq(req, res) {
		try {
			const data = req.body;
			const user = req.decoded.payload.id;
			console.log(user);
			const group = data.group_id;
			const schema = {
				request_sender: Joi.string().required(),
				group_id: Joi.string().required(),
				request_reciever: Joi.string().required(),
			}
			const options = {
				request_sender: user,
				group_id: group,
				request_reciever: data.request_reciever,
			}
			const { error } = Joi.validate(options, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const is_member = async (data) => {
			// 	await this.isGroupMember(req, res, data);
			// }
			// const reciever_data = await is_member({ user_id: data.reciever, group_id: data.group_id });
			// const sender_data = is_member({ user_id: user, group: data.group_id });



			const sender_data = await super.getByCustomOptions(req, 'group_member_map', {
				where: {
					active: true,
					user_id: user,
					group_id: group,
				}
			});
			console.log(sender_data);


			const reciever_data = await super.getByCustomOptions(req, 'group_member_map', {
				where: {
					active: true,
					user_id: data.request_reciever,
					group_id: group,
				}
			});
			console.log(_.isUndefined(sender_data));
			if (_.isUndefined(sender_data)) {
				// if (sender_data.is_admin && _.isUndefined(reciever_data))
				// 	options.is_acceptor_admin = false;

				// else if (reciever_data.is_admin && _.isUndefined(sender_data))
				const req_data = await super.getByCustomOptions(req, "group_member_req", {
					where: {
						OR: [
							{
								request_reciever: data.request_reciever,
								request_sender: user,
								group_id: group
							},
							{
								request_reciever: user,
								request_sender: data.request_reciever,
								group_id: group
							}
						]

					}
				})
				console.log('req');
				console.log(req_data);
				console.log(!_.isUndefined(req_data));
				if (!_.isUndefined(req_data)) {
					return requestHandler.throwError(400, "Request already there", "You have already requested to be a member")()
				}

				options.is_acceptor_admin = true;
				options.request_accepted = false;
				options.id = uuid.v4();
				// const obj = {};
				console.log(options);
				const result = await super.create(req, 'group_member_req', options);
				const payload = _.pick(result, ['id', 'created_on', 'updated_on', 'active'])
				console.log(payload);
				return requestHandler.sendSuccess(res, 'Request to join group sent successfully successfully')({ payload });;
			}
			else if (_.isUndefined(reciever_data)) {
				console.log('reciever data');
				console.log(reciever_data);
				const req_data = await super.getByCustomOptions(req, "group_member_req", {
					where: {
						OR: [
							{
								request_reciever: data.request_reciever,
								request_sender: user,
								group_id: group
							},
							{
								request_reciever: user,
								request_sender: data.request_reciever,
								group_id: group
							}
						]

					}
				})

				if (!_.isUndefined(req_data))
					return requestHandler.throwError(400, "Request already there", "You have already requested to be a member")();

				options.is_acceptor_admin = false;
				options.request_accepted = false;

				options.id = uuid.v4();
				// const obj = {};
				console.log(options);
				const result = await super.create(req, 'group_member_req', options);
				const payload = _.omit(result, ['created_on', 'updated_on', 'active'])
				console.log(payload);
				return requestHandler.sendSuccess(res, 'Request to join group sent successfully successfully')({ payload });;
			}
			// if(_.isUndefined(sender_data) )
			else if ((sender_data.is_admin && reciever_data)) {
				requestHandler.throwError(400, 'bad request', 'invalid member request,member already existed')();
			}


		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
 * Param - req - id: req.params.id | Member Request Id
 * 		   request_reciever : body | id of user
 * Use - delete Group member req
 * Flow - 1 - Check req 
 * 		  2 - if( no req ) throw err
 * 		  3 - Check admin 
 * 				if( no admin ) throw err
 * 		  4 - if(!is_admin && user !== request_reciever) succes - permanent delete req
 */
	static async deleteGroupMemberReq(req, res) {
		try {
			const data = req.body;
			const user = req.decoded.payload.id;
			const schema = {
				id: Joi.string().required(),
				request_reciever: Joi.string().required()
				// group_id: Joi.string().required(),
				// request_reciever: Joi.string().required(),
				// is_acceptor_admin: Joi.boolean().required()
			}
			const validate = {
				id: req.params.id,
				// group_id: data.group_id,
				request_reciever: data.request_reciever,
				// is_acceptor_admin: data.is_acceptor_admin
			}
			const options = {
				id: req.params.id,
				active: true,
				// group_id: data.group_id,
				// request_reciever: data.reciever,
				// is_acceptor_admin: data.is_acceptor_admin
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const req_data = await super.getById(req, "group_member_req", options);
			console.log(req_data);
			// const sender_data = is_member({ user_id: user, group: data.group_id });
			if (!req_data) {
				requestHandler.throwError(400, 'bad request', 'invalid delete request,request not found')();
			}
			console.log(user);
			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: data.group_id,
					user_id: user,
					is_admin: true
				}
			})
			console.log(is_admin);
			if (!is_admin && user !== data.request_reciever) {
				requestHandler.throwError(400, 'bad request', 'You cannot delete data')();
			}

			const result = await super.deleteByIdPermanent(req, 'group_member_req');
			const payload = _.pick(result, ['id', 'group_id', 'user_id']);
			return requestHandler.sendSuccess(res, 'Request to join group deleted successfully')({ payload });

			// options.id = uuid.v4();
			// options.request_accepted = reciever_data.isAdmin;
			// // const obj = {};

		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}
	/*********************************************
 * Param - req - group_id: req.params.id | Member Request Id
 * 			skip,take - integer
 * Use - Group member reqs
 * Flow - 1 - Send list of member req of group
 * 				skip: data.skip,
				take: data.take,
				where: {
					group_id: req.params.id,
					request_accepted: false,
				}
 */
	static async GroupMemberRequests(req, res) {
		try {
			const data = req.body;
			const schema = {
				// user_id: Joi.string().required(),
				group_id: Joi.string().required(),
				skip: Joi.number().required(),
				take: Joi.number().required(),
			}
			const validate = {
				skip: data.skip,
				take: data.take,
				group_id: req.params.id,
				// is_admin: data.is_admin
			}
			const options = {
				skip: data.skip,
				take: data.take,
				where: {
					group_id: req.params.id,
					request_accepted: false,
					// active: true
					// is_admin: data.is_admin
				}
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const obj = {};
			const payload = await super.getList(req, 'group_member_req', options);
			return requestHandler.sendSuccess(res, 'Group member added successfully')({ payload });;
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}
/*********************************************
 * Param - req - group_id: req.params.id | Member Request Id
 * 			skip,take - integer
 * Use - Group member reqs
 * Flow - 1 - Send list of group req of user
 * 				skip: data.skip,
				take: data.take,
				where: {
					OR : [
						{request_sender: user},
						{request_reciever: user}
					],
					
					// active: true
					request_accepted: false,
					// is_admin: data.is_admin
				}
 */
	static async GroupRequests(req, res) {
		try {
			const data = req.body;
			const user = req.decoded.payload.id
			const schema = {
				// user_id: Joi.string().required(),
				user_id: Joi.string().required(),
				skip: Joi.number().required(),
				take: Joi.number().required(),

			}
			const validate = {
				skip: data.skip,
				user_id: user,
				take: data.take,
				// is_admin: data.is_admin
			}
			const options = {
				skip: data.skip,
				take: data.take,
				where: {
					OR : [
						{request_sender: user},
						{request_reciever: user}
					],
					
					// active: true
					request_accepted: false,
					// is_admin: data.is_admin
				}
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// const obj = {};
			const payload = await super.getList(req, 'group_member_req', options);
			return requestHandler.sendSuccess(res, 'Group member added successfully')({ payload });;
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

}

module.exports = groupsMemberController;
