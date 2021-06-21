const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
// const BaseController = require('./BaseController');
const GroupMemberController = require("./GroupsMemberController");
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
const { createId } = require('../utils/idUtil');
// const { profile } = require('winston');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
// const gm = new GroupMemberController(10);
// console.log(gm);
class groupsController extends GroupMemberController {
	/*********************************************
	 * Param - req - group_id: req.params.id | Member Request Id
	 * Use - Group with full data
	 * Flow - 1 check if user is member
	 * 		  2 get data - options based on membership
	 * 		  3 get group
	 */
	static async getGroupById(req, res) {
		try {
			console.log(req.params);
			const reqParam = req.params.id;
			console.log(reqParam);
			const schema = {
				id: Joi.string().required(),
				// is_active: Joi.boolean().required(),
			};
			const { error } = Joi.validate({ id: reqParam, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				include: {
					_count: {
						select: { group_member_map: true },
					},
					created_by_user: true,
					problem: {
						select: {
							name: true,
							description: true
						}
					},
					posts: {
						skip: 0,
						take: 10,
						where: {
							active: true,
						},
						select: {
							title: true,
							description: true,
							keyword: true,
							atachments: {
								select: {
									url: true
								}
							},
						}
					},

				},
				where: {
					id: reqParam,
					// active: req.body.is_active
				},
			};
			console.log("checking");
			const member_check = await super.isGroupMember(req, res, { group_id: reqParam, user_id: req.decoded.payload.id });
			// const member_check = _isGroupMember.bind(this);
			if (!member_check.isMember) {
				console.log("no");
				options.include.posts.where.visibility = 'PUBLIC';
			}
			if (member_check.isMember && member_check.isAdmin !== true) {
				console.log("member");
				options.include.posts.where.NOT = { visibility: 'PUBLIC' };
			}
			console.log(options);
			const result = await super.getByCustomOptions(req, 'groups', options);
			const payload = result
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	/*********************************************
	 * Param - req - group_id: req.params.id | Member Request Id
	 * Use - soft delete Group
	 * Flow - 1 check if user is admin
	 * 		  2 if admin soft delete- active = false
	 */
	static async deleteById(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const group = req.params.id;
			const schema = {
				group_id: Joi.string().required()
			}
			const { error } = Joi.validate({ group_id: group, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const member_check = await super.isGroupMember(req, res, { group_id: group, user_id: user })
			console.log(member_check);
			// console.log(JSON.stringify(member_check));
			if (member_check.isAdmin) {
				const result = await super.updateById(req, 'groups', {
					active: false, updated_by: user
				});
				console.log("result");
				console.log(result);
				const payload = result
				//  _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
				return requestHandler.sendSuccess(res, 'Group Deleted Successfully')({ payload });
			}
			else {
				return requestHandler.throwError(400, 'bad request', "User is not authorized to delete group.")()
			}
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
 * Param - req - group_id: req.params.id | Member Request Id
 * Use - soft delete Group
 * Flow - 1 check if user is admin
 * 		  2 if admin soft delete- active = true
 */
	static async activateById(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const group = req.params.id;
			const member_check = await super.isGroupMember(req, res, { group_id: group, user_id: user })
			// console.log(member_check);
			// console.log(JSON.stringify(member_check));
			if (member_check.isAdmin) {
				const result = await super.updateById(req, 'groups', { active: true, updated_by: user });
				console.log("result");
				console.log(result);
				const payload = _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
				return requestHandler.sendSuccess(res, 'Group Deleted Successfully')({ payload });
			}
			else {
				return requestHandler.throwError(400, 'bad request', "User is not authorized to activate group.")()
			}
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
 * Param - req - group_id: req.params.id | Member Request Id
 * Use - Permanent delete Group  | this is not been used | it may be use by internal admin
 * Flow - 1 check if user is admin
 * 		  2 if admin soft delete- active = false
 */
	/* Here not checking group coz this will be used by backend admin May need updation */
	static async deleteByIdAdmin(req, res) {
		try {
			const result = await super.deleteByIdPermanent(req, 'groups');
			return requestHandler.sendSuccess(res, 'Groups Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	/*********************************************
	 * Param - req - group_id: req.params.id | Member Request Id
	 * Use - Group with less data
	 * Flow - get generic data of group
	 */
	// IT IS LIKE HOME OF PAGE FOR GERNAL DETAILS
	static async getProfileGroup(req, res) {
		// console.log(req);
		// OVERVIEW OF PROFILE
		try {
			const reqParam = req.params.id;
			// const user = req.decoded.payload.id;
			const schema = {
				id: Joi.string().required(),
			};
			const { error } = Joi.validate({ id: reqParam }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					id: reqParam,
					active: true
				},
				include: {
					created_by_user: true,
					problem: {
						select: {
							name: true,
							description: true
						}
					},
					_count: {
						select: {
							group_member_map: true,
							posts: true
						}
					}
				},
			};
			// const member_check = await this._isGroupMember(user, reqParam);
			console.log(options);
			const result = await super.getByCustomOptions(req, 'groups', options);
			const payload = _.omit(result, ['created_on', 'active', 'updated_by'])
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	/*********************************************
	 * Param - req - group_id: req.params.id | Member Request Id
	 * 		   Many based on model
	 * Use - Update group
	 * Flow - 1 check if user is admin
	 * 		  2 if admin success - update group 
	 * 		  3 else throw err
	 */
	static async updateGroup(req, res) {
		try {
			const data = req.body;
			const group = req.params.id;
			const user = req.decoded.payload.id;
			const ph_number = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
			const visibility = /PUBLIC|PRIVATE|FRIENDS/;
			const schema = {
				name: Joi.string(),
				email: Joi.string().email(),
				ph_number: Joi.string().regex(ph_number),
				profile_photo: Joi.string(),
				cover_photo: Joi.string(),
				id: Joi.string(),
				bio: Joi.string(),
				problem_category: Joi.string(),
				visibility: Joi.string().regex(visibility),
			}
			const options = {
				id: group,
				name: data.name,
				email: data.email,
				ph_number: data.ph_number,
				profile_photo: data.profile_photo,
				cover_photo: data.cover_photo,
				bio: data.bio,
				problem_category: data.problem_category,
				visibility: data.visibility,
			};
			console.log("req > ");
			console.log(req.body);
			const { error } = Joi.validate(options, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			options.group_id = createId(data.name);
			options.updated_by = user;
			console.log("updating .... ");
			// ISME DONO COVER HO GYE GROUP CHECK AND MEMBER CHECK
			const member_check = await super.isGroupMember(req, res, { user_id: user, group_id: group });
			if (member_check.isAdmin) {
				const groupProfile = await super.updateById(req, 'groups', options);
				console.log(groupProfile);
				const payload = _.omit(groupProfile, ['created_on', 'updated_on', 'active']);
				return requestHandler.sendSuccess(res, 'Group updated Successfully')({ payload });
			}
			else {
				return requestHandler.throwError(400, 'bad request', "User is not authorized to update group.")()
			}
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
	 * Param - req - group_id: req.params.id | Member Request Id
	 * 		   Many based on model
	 * Use - Create group
	 * Flow - 1 create group
	 * 		  2 create member as admin
	 * 		  3 else throw err
	 */
	static async createGroup(req, res) {
		try {
			const data = req.body;
			// const gruop = req.params.id;
			const user = req.decoded.payload.id;
			const ph_number = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
			const visibility = /PUBLIC|PRIVATE|FRIENDS/;
			const schema = {
				name: Joi.string(),
				email: Joi.string().email(),
				ph_number: Joi.string().regex(ph_number),
				profile_photo: Joi.string(),
				cover_photo: Joi.string(),
				bio: Joi.string(),
				problem_category: Joi.string(),
				visibility: Joi.string().regex(visibility),
			}
			const options = {
				name: data.name,
				email: data.email,
				ph_number: data.ph_number,
				profile_photo: data.profile_photo,
				cover_photo: data.cover_photo,
				bio: data.bio,
				problem_category: data.problem_category,
				visibility: data.visibility,
			};
			const { error } = Joi.validate(options, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			options.id = uuid.v4()
			options.group_id = createId(data.name);
			options.created_by = user;
			options.updated_by = user
			console.log("req > ");
			console.log(req);
			console.log(options);
			const groupProfile = await super.create(req, 'groups', options);
			// ADDING MEMBER DIRECTLY ~ LEAVING IT AS IT IS BUT MAY BE BUG 
			const addMember = await super.create(req, "group_member_map", { id: uuid.v4(), user_id: user, group_id: groupProfile.id, is_admin: true });
			const profile = _.omit(groupProfile, ['created_on', 'updated_on', 'active']);
			const payload = { profile, addMember }
			return requestHandler.sendSuccess(res, 'Group created Successfully')({ payload });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	/*********************************************
	 * Param - req - user_id: req.params.id | Member Request Id
	 * Use - User groups
	 * Flow - 1 getting user by custom options -
	 * 			where: {
					id: user
				},
				select: {
					groups: {
						select: {
							groups : true
						}
					}
				}
	 */
	static async groupsList(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.params.id;
			// const group = req.params.id;
			// const member_check = await super.isGroupMember(req, res, { group_id: group, user_id: user })
			// console.log(member_check);
			// console.log(JSON.stringify(member_check));
			const schema = {
				id: Joi.string().required()
			}
			const { error } = Joi.validate({ id: user, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			console.log('GETTING');
			const options = {
				where: {
					id: user
				},
				select: {
					groups: {
						select: {
							groups: true
						}
					}
				}
			}
			console.log(options);
			const user_grp_map = await super.getByCustomOptions(req, 'users', options);
			const payload = user_grp_map;
			console.log(payload);
			return requestHandler.sendSuccess(res, 'Groups')({ payload });
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}
	/*
		static async _isGroupMember(user, group) {
			try {
				const options = {
					where: {
						active: true,
						user_id: user,
						group_id: group,
						isadmin: true,
					}
				}
				const obj = {};
				console.log('check');
				const member_check = await super.getByCustomOptions(req, 'group_member_map', options);
				console.log(member_check);
				if (member_check.length > 0) {
					obj.isMember = true;
					obj.iAdmin = member_check.isadmin;
				}
				else {
					obj.isMember = false;
					obj.isAdmin = member_check.isadmin;
				}
				console.log(obj);
				return obj;
			} catch (err) {
				console.log(err);
				return requestHandler.sendError(req, res, err);
			}
		}
	
		static async addGroupMember(req, res) {
			try {
				const data = req.body;
				const schema = {
					user_id: Joi.string().required(),
					group_id: Joi.string().required(),
					isadmin: Joi.boolean().required()
				}
				const options = {
					user_id: data.user,
					group_id: data.group,
					isadmin: data.isadmin
				}
				const { error } = Joi.validate(options, schema);
				requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
	
				options.id = uuid.v4()
				// const obj = {};
				const add_member = await super.create(req, 'group_member_map', options);
				return requestHandler.sendSuccess(res, 'Group member added successfully')({ add_member });;
			} catch (err) {
				// console.log(err);
				return requestHandler.sendError(req, res, err);
			}
		}
	
	
	*/
}

module.exports = groupsController;
