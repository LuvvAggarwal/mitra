const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
const BaseController = require('./BaseController');
// const GroupMemberController = require("./GroupMemberController");
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const data_type = require("../config/validations/dataTypes")
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { createId } = require('../utils/idUtil');
// const { profile } = require('winston');
const nc = require('../controllers/NotificationController');
// const nc = new notificationController()
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const take_config = require("../config/takeConfig");
const { group_member_map_children } = require('../config/softDeleteCascade');
const take = take_config.group_member;

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
			// console.log('check');
			const member_check = await super.getByCustomOptions(req, 'group_member_map', options);
			// console.log(member_check);
			if (member_check.active && member_check.id) {
				obj.id = member_check.id;
				obj.isMember = true;
				obj.isAdmin = member_check.is_admin;
			}
			else {
				obj.isMember = false;
				obj.isAdmin = member_check.is_admin;
			}
			// console.log(obj);
			return obj;
		} catch (err) {
			// console.log(err);
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
			const user = req.decoded.payload
			const schema = {
				id: data_type.id,
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
			const query = {
				where: {
					id: req.params.id,
					active: true,
					request_accepted: false,
				},
				include: {
					groups: {
						select:{
							group_id: true,
							name: true
						}
					}
				}
			}
			const req_data = await super.getByCustomOptions(req, "group_member_req", query)
			// console.log(req_data);
			if (!req_data) {
				requestHandler.throwError(400, 'bad request', 'Request not found')();
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
			// console.log(result);
			const req_accepted = await super.updateById(req, 'group_member_req', { request_accepted: true, member_id: id });
			// console.log(req_accepted);
			const link_source = "/group/" + req_data.groups.group_id
			const grp_name = req_data.groups.name
			const notify =  nc.groupMemberRequestAcceptedNotification(user,user_id,link_source,grp_name)
			const payload = _.pick(result, ["id", "user_id", "group_id"])
			return requestHandler.sendSuccess(res, 'Group member added successfully')({ payload,notify });;
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
				id: data_type.id,
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

			// console.log(req_data);

			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			});

			// console.log(is_admin);

			if (!is_admin && user !== req_data.user_id) {
				requestHandler.throwError(400, 'bad request', 'You cannot delete data')();
			}

			if (req_data.user_id == user || is_admin) {
				const children_data = group_member_map_children()
				const result = await super.deleteByIdCascade(req, 'group_member_map',children_data);
				const payload = _.pick(result, ["id", "user_id", "group_id"])
				return requestHandler.sendSuccess(res, 'group member deleted successfully')({ payload });
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
			const data = req.params;
			// console.log(data);
			const lastNumber = parseInt(data.lastNumber.replace("n",""),10);
			// console.log("Lastnumber " + lastNumber);
			const schema = {
				// user_id: Joi.string().required(),
				group_id: data_type.id,
				is_admin: data_type.boolean,
				lastNumber: data_type.integer,
				// take: Joi.number().required(),
			}
			const validate = {
				lastNumber,
				group_id: req.params.id,
				// take: take,
				is_admin: req.params.is_admin
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			
			const options = {
				// skip: data.skip,
				take: take,
				where: {
					group_id: req.params.id,
					active: true,
					// is_admin: data.is_admin === 'true'
				},
				orderBy:{
					number: "asc"
				},
				select: {
					number: true,
					id: true,
					users: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
						}
					}
				}
			}
			// const obj = {};
			if (lastNumber > -1) {
				options.where.number = {
					gt: lastNumber
				}
			}
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
	 * 		  5 - if (req_data && is_admin) - success - update member - block: true
	 * 		  6 - else throw err
	 */
	static async blockGroupMember(req, res) {
		try {
			const id = req.params.id;
			const user = req.decoded.payload.id;
			// console.log(user);
			const schema = {
				id: data_type.id,
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
			// console.log(req_data);

			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			})
			// console.log(is_admin);
			if (!is_admin) {
				requestHandler.throwError(400, 'bad request', 'You cannot block data')();
			}


			if (req_data && is_admin) {
				const result = await super.updateById(req, 'group_member_map',{block: true});
				const payload = _.omit(result, ["created_on", "updated_on", " number"])
				return requestHandler.sendSuccess(res, 'group member blocked successfully')({ payload });
			} else {
				return requestHandler.throwError(400, "bad request", "You are not authorized to block")()
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
				id: data_type.id,
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
			// console.log(req_data);

			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			})
			// console.log(is_admin);
			if (!is_admin) {
				requestHandler.throwError(400, 'bad request', 'You cannot activate data')();
			}


			// console.log(req_data);
			if (req_data && is_admin) {
				const result = await super.updateById(req, 'group_member_map', { block: false });
				const payload = _.pick(result, ["id", "user_id", "group_id"])
				return requestHandler.sendSuccess(res, 'You have activated group member')({ payload });
			} else {
				return requestHandler.throwError(400, 'bad request', 'You are not authorized to activate group member')();
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
				id: data_type.id,
				is_admin: data_type.boolean
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
			// console.log(req_data);

			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			})
			// console.log(is_admin);
			if (!is_admin) {
				requestHandler.throwError(400, 'bad request', 'You cannot update data')();
			}

			if (req_data && is_admin) {
				const result = await super.updateById(req, 'group_member_map', { is_admin: req.body.is_admin });
				const payload = _.pick(result, ["id", "user_id", "group_id"])
				return requestHandler.sendSuccess(res, 'You have activated group member')({ payload });
			} else {
				return requestHandler.throwError(400, 'bad request', 'You are not authorized to update group member')();
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
			const name = req.decoded.payload.name ;
			// console.log(user);
			const group = req.params.id;
			// console.log("Group  "  + group);
			const schema = {
				request_sender: data_type.id,
				group_id: data_type.id,
				request_reciever: data_type.id,
			}
			const options = {
				request_sender: user,
				group_id: group,
				request_reciever: data.request_reciever,
			}
			// console.log("request reciever");
			// console.log(data.request_reciever);
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
				},
				include: {
					groups:{
						select: {
							group_id: true,
							name: true,
							profile_photo: true
						}
					}
				}
			});
			// console.log(sender_data);


			const reciever_data = await super.getByCustomOptions(req, 'group_member_map', {
				where: {
					active: true,
					user_id: data.request_reciever,
					group_id: group,
				},
				include: {
					groups:{
						select: {
							group_id: true,
							name: true,
							profile_photo: true
						}
					}
				}
			});

			// console.log("reciever >>>>>>>>");
			// console.log(reciever_data);
			// console.log("sender >>>>>>>>>>>");
			// console.log(sender_data);
			// console.log(_.isUndefined(sender_data));
			if (_.isUndefined(sender_data)) {
				// if (sender_data.is_admin && _.isUndefined(reciever_data))
				// 	options.is_acceptor_admin = false;

				// else if (reciever_data.is_admin && _.isUndefined(sender_data))
				const req_data = await super.getByCustomOptions(req, "group_member_req", {
					where: {
						// OR: [
							// {
								active: true,
								request_reciever: data.request_reciever,
								request_sender: user,
								group_id: group
							},
						// 	{
						// 		request_reciever: user,
						// 		request_sender: data.request_reciever,
						// 		group_id: group
						// 	}
						// ]

					// }
				})
				// console.log('req');
				// console.log(req_data);
				// console.log(!_.isUndefined(req_data));
				if (!_.isUndefined(req_data)) {
					return requestHandler.throwError(400, "Request already there", "You have already requested to be a member")()
				}

				options.is_acceptor_admin = true;
				options.request_accepted = false;
				options.id = uuid.v4();
				// const obj = {};
				// console.log(options);
				const payload = await super.create(req, 'group_member_req', options);
				const link_source = "/group/" + payload.group_id ;
				const notify = nc.groupMembershipRequestNotification({id:user,name},data.request_reciever,link_source)
				// const payload = _.pick(result, ['id', 'created_on', 'updated_on', 'active'])
				// console.log(payload);
				return requestHandler.sendSuccess(res, 'Request to join group sent successfully')({ payload,notify });;
			}
			else if (_.isUndefined(reciever_data)) {
				// console.log('reciever data');
				// console.log(reciever_data);
				const req_data = await super.getByCustomOptions(req, "group_member_req", {
					where: {
						// OR: [
						// 	{	
								active: true,
								request_reciever: data.request_reciever,
								request_sender: user,
								group_id: group
							},
					// 		{
					// 			request_reciever: user,
					// 			request_sender: data.request_reciever,
					// 			group_id: group
					// 		}
					// 	]

					// }
				})

				if (!_.isUndefined(req_data))
					return requestHandler.throwError(400, "Request already there", "You have already requested to be a member")();

				options.is_acceptor_admin = false;
				options.request_accepted = false;

				options.id = uuid.v4();
				// const obj = {};
				// console.log(options);
				const payload = await super.create(req, 'group_member_req', options);

				const link_source = "/group/" + payload.group_id ;
				const notify = nc.groupMembershipRequestAdminNotification({id:user,name},data.request_reciever,link_source)
				
				// console.log(payload);
				return requestHandler.sendSuccess(res, 'Request to join group sent successfully successfully')({ payload, notify });;
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
			// const data = req.body;
			const user = req.decoded.payload.id;
			const request_sender = req.params.sen
			const request_reciever = req.params.rec
			const schema = {
				id: data_type.id,
				request_sender: data_type.id,
				request_reciever: data_type.id
				// group_id: Joi.string().required(),
				// request_reciever: Joi.string().required(),
				// is_acceptor_admin: data_type.boolean
			}
			const validate = {
				id: req.params.id,
				// group_id: data.group_id,
				request_sender: request_sender,
				request_reciever: request_reciever
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
			// console.log(req_data);
			// const sender_data = is_member({ user_id: user, group: data.group_id });
			if (!req_data) {
				requestHandler.throwError(400, 'bad request', 'invalid delete request,request not found')();
			}
			// console.log(user);
			const is_admin = await super.getByCustomOptions(req, "group_member_map", {
				where: {
					group_id: req_data.group_id,
					user_id: user,
					is_admin: true
				}
			})
			// console.log(is_admin);
			if (!is_admin && user !== request_sender && user !== request_reciever) {
				requestHandler.throwError(400, 'bad request', 'You cannot delete data')();
			}

			const result = await super.deleteById(req, 'group_member_req');
			// const payload = _.pick(result, ['id', 'group_id', 'user_id']);
			return requestHandler.sendSuccess(res, 'Request to join group deleted successfully')({ payload: result });

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
			let lastNumber = req.params.lastNumber;
			lastNumber = parseInt(lastNumber.replace("n",""),10);
			const schema = {
				// user_id: Joi.string().required(),
				group_id: data_type.id,
				lastNumber: data_type.integer
				// take: Joi.number().required(),
			}
			const validate = {
				// skip: data.skip,
				lastNumber,
				// take: take,
				group_id: req.params.id,
				// is_admin: data.is_admin
			}
			const options = {
				// skip: data.skip,
				take: take,
				where: {
					group_id: req.params.id,
					request_accepted: false,
					active: true
					// is_admin: data.is_admin
				},
				orderBy:{
					number : "desc"
				},
				select: {
					number: true,
					id: true,
					request_reciever_user: {
						select: {
							id: true,
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							// bio: true,
						}
					},
					request_sender_user: {
						select: {
							id: true,
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							// bio: true,
						}
					},
					groups: {
						select: {
							id: true,
							name: true,
							group_id: true,
							profile_photo: true
						}
					}
				}
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			if (lastNumber > -1) {
				options.where.number = {
					lt: lastNumber
				}
			}
			// const obj = {};
			const payload = await super.getList(req, 'group_member_req', options);
			// console.log(payload);
			return requestHandler.sendSuccess(res, "Group's member requests fetched successfully")({ payload });;
		} catch (err) {
			// console.log(err);
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
			const lastNumber = req.params.lastNumber;
			const user = req.decoded.payload.id
			const schema = {
				// user_id: Joi.string().required(),
				user_id: data_type.id,
				lastNumber: data_type.integer,
				// take: Joi.number().required(),

			}
			const validate = {
				// skip: data.skip,
				lastNumber,
				user_id: user,
				// take: data.take,
				// is_admin: data.is_admin
			}
			const options = {
				// skip: data.skip,
				take: take,
				where: {
					OR: [
						{ request_sender: user },
						{ request_reciever: user }
					],

					active: true,
					request_accepted: false,
					// is_admin: data.is_admin
				},
				orderBy: {
					number: "asc"
				},
				select: {
					id:true,
					number: true,
					request_reciever_user: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							// cover_photo: true,
							// bio: true,
						}
					},
					request_sender_user: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							// cover_photo: true,
							// bio: true,
						}
					},
					groups: {
						select: {
							id: true,
							name: true,
							// gender: true,
							profile_photo: true
						}
					}
				}
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			if (lastNumber > -1) {
				options.where.number = {
					gt: lastNumber
				}
			}
			// const obj = {};
			const payload = await super.getList(req, 'group_member_req', options);
			// console.log(payload);
			return requestHandler.sendSuccess(res, "User's Group member requests fetched successfully")({ payload });;
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

}

module.exports = groupsMemberController;
