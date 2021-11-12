const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
// const BaseController = require('./BaseController');
const { isGroupMember } = require("./GroupsMemberController");
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const data_type = require("../config/validations/dataTypes")
const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
const { createId } = require('../utils/idUtil');
const { group_children } = require("../config/softDeleteCascade")
const take_config = require("../config/takeConfig");
const BaseController = require('./BaseController');
const take = take_config.groups;
const queryString = require("querystring")

// const { profile } = require('winston');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
// const gm = new GroupMemberController(10);
// console.log(gm);
class groupsController extends BaseController {
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
				id: data_type.id,
				// is_active: Joi.boolean().required(),
			};
			const { error } = Joi.validate({ id: reqParam, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid Group Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					id: reqParam,
					// active: req.body.is_active
				},

				include: {
					_count: {
						select: {
							members: true,
							posts: true,
							requests: true
						},
					},
					created_by_user: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
						}
					},
					problem: {
						select: {
							name: true,
							description: true
						}
					},
				}
			};
			console.log("checking");
			// const member_check = await isGroupMember(req, res, { group_id: reqParam, user_id: req.decoded.payload.id });

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
	static async deleteGroupById(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const group = req.params.id;
			const schema = {
				id: data_type.id
			}
			const { error } = Joi.validate({ id: group, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const member_check = await isGroupMember(req, res, { group_id: group, user_id: user })
			console.log(member_check);
			// console.log(JSON.stringify(member_check));
			if (member_check.isAdmin) {
				// const result = await super.updateById(req, 'groups', {
				// 	active: false, updated_by: user
				// });
				const children_data = group_children()
				const result = await super.deleteByIdCascade(req, 'groups', children_data)
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
	 * Param - req - group_id: req.params.group_id | Member Request Id
	 * Use - Group with less data
	 * Flow - get generic data of group
	 */
	// IT IS LIKE HOME OF PAGE FOR GERNAL DETAILS
	static async getProfile(req, res) {
		// console.log(req);
		// OVERVIEW OF PROFILE
		try {
			const group_id = req.params.group_id;
			// const user = req.decoded.payload.id;
			const schema = {
				group_id: data_type.str_100_req,
			};
			const { error } = Joi.validate({ group_id }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					group_id,
					active: true
				},
				include: {
					created_by_user: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
						}
					},
					problem: {
						select: {
							name: true,
							description: true
						}
					},
					_count: {
						select: {
							members: true,
							// requests: true,
							posts: true
						}
					}
				},
			};
			// const member_check = await isGroupMember(user, reqParam);
			console.log(options);
			const result = await super.getByCustomOptions(req, 'groups', options);
			const payload = _.omit(result, ['created_on', 'active', 'updated_on',])
			return requestHandler.sendSuccess(res, 'Group Data Fetchted Successfully')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
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
			const user = req.decoded.payload.id;
			const schema = {
				id: data_type.str_250_req,
			};
			const { error } = Joi.validate({ id: reqParam }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					group_id: reqParam,
					active: true
				},
				include: {
					created_by_user: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
						}
					},
					problem: {
						select: {
							name: true,
							description: true
						}
					},
					members: {
						where: {
							user_id: user,
							active: true
						}
					},
					requests: {
						where: {
							active: true,
							OR: [{
								request_sender: user
							},
							{ request_reciever: user }
							],
							request_accepted: false
						}
					},
					posts: {
						take: 5,
						where: {
							active: true
						},
						include: {
							atachments: true,
							users: {
								select: {
									name: true,
									profile_photo: true
								}
							},
							likes: {
								where: {
									user_id: user
								}
							},
							_count: {
								select: {
									comments: true,
									likes: true,
									shares: true,
								},
							},
						}
					}
				},
			};
			// const member_check = await isGroupMember(user, reqParam);
			console.log(options);
			const result = await super.getByCustomOptions(req, 'groups', options);
			const payload = _.omit(result, ['created_on', 'active', 'updated_on',])
			return requestHandler.sendSuccess(res, 'Group Data Fetchted Successfully')({ payload });
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
				id: data_type.id,
				name: data_type.str_250_req,
				email: data_type.email,
				ph_number: data_type.ph_number,
				profile_photo: data_type.img_url,
				cover_photo: data_type.img_url,
				bio: data_type.text,
				problem_category: data_type.id,
				visibility: data_type.visibility,
			}
			const options = {
				id: group,
				name: data.name,
				email: data.email,
				ph_number: data.ph_number,
				profile_photo: req.files.profile_photo[0].path,
				cover_photo: req.files.cover_photo[0].path,
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
			const member_check = await isGroupMember(req, res, { user_id: user, group_id: group });
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
			console.log(req.files.profile_photo[0].path);
			console.log(data.email);
			// res.json({req})
			const visibility = /PUBLIC|PRIVATE|FRIENDS/;
			const schema = {
				name: data_type.str_250_req,
				email: data_type.email,
				ph_number: data_type.ph_number,
				profile_photo: data_type.img_url,
				cover_photo: data_type.img_url,
				bio: data_type.text,
				problem_category: data_type.id,
				visibility: data_type.visibility,
			}
			const options = {
				name: data.name,
				email: data.email,
				ph_number: data.ph_number,
				profile_photo: req.files.profile_photo[0].path,
				cover_photo: req.files.cover_photo[0].path,
				bio: data.bio,
				problem_category: data.problem_category,
				visibility: data.visibility,
			};
			const { error } = Joi.validate(options, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			options.id = uuid.v4()
			options.group_id = createId(data.name);
			options.created_by = user;
			options.updated_by = user;
			// options.profile_photo = req.files.
			console.log("req > ");
			console.log(req);
			console.log(options);
			const groupProfile = await super.create(req, 'groups', options);
			// ADDING MEMBER DIRECTLY ~ LEAVING IT AS IT IS BUT MAY BE BUG 
			const addMember = await super.create(req, "group_member_map", { id: uuid.v4(), user_id: user, group_id: groupProfile.id, is_admin: true, active: true });
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
	 * 	const options = {
				take: take,
				where: {
					user_id: user,
					active: true,
				},
				orderBy:{
					number: "asc"
				},
				select: {
					groups: {
						select: {
							id: true,
							group_id: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
						}
					}
				}
	 */
	static async groupsList(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.params.id;
			let lastNumber = req.params.lastNumber;
			lastNumber = parseInt(lastNumber.replace("n", ""), 10)
			console.log(lastNumber);
			// const group = req.params.id;
			// const member_check = await isGroupMember(req, res, { group_id: group, user_id: user })
			// console.log(member_check);
			// console.log(JSON.stringify(member_check));
			const schema = {
				id: data_type.id,
				lastNumber: data_type.integer
			}
			const { error } = Joi.validate({ id: user, lastNumber: lastNumber/*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			console.log('GETTING');
			//WE COULD DIRECTLY SEARCH ON GROUP MEMBER MAP BUT FINE AS OF NOW
			const options = {
				take: take,
				where: {
					user_id: user,
					active: true,
				},
				orderBy: {
					number: "asc"
				},
				select: {
					id: true,
					number: true,
					groups: {
						select: {
							id: true,
							group_id: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
						}
					}
				}
			}
			if (lastNumber > -1) {
				options.where.number = { gt: lastNumber }
			}
			console.log(options);
			const user_grp_map = await super.getList(req, 'group_member_map', options);
			const payload = user_grp_map;
			console.log(payload);
			return requestHandler.sendSuccess(res, "User's Groups Fetched Successfully")({ payload });
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	static async getGroups(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const q = req.params.q; // query
			// const lastNumber = req.body.lastNumber
			// const group = req.params.id;
			// const member_check = await isGroupMember(req, res, { group_id: group, user_id: user })
			// console.log(member_check);
			// console.log(JSON.stringify(member_check));
			const schema = {
				q: data_type.text,
				// lastNumber: data_type.integer
			}
			const { error } = Joi.validate({ q: q }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			console.log('GETTING');
			const urlSearchParams = new URLSearchParams(q);
			const query = Object.fromEntries(urlSearchParams.entries());
			console.log(query);
			let where;
			if (query.keyword == "" && query.problem == "") {
				where = {
					active: true
				}
			} else if (query.keyword == "" && query.problem != "") {
				where = {
					problem_category: query.problem,
					active: true,
				}
			} else if (query.keyword != "" && query.problem == "") {
				where = {
					name: {
						contains: query.keyword,
						mode: 'insensitive',
					}
				}
			} else {
				where = {
					name: {
						contains: query.keyword,
						mode: 'insensitive',
					},
					problem_category: query.problem,
					active: true
				}
			}

			const lastNumber = parseInt(query.lastNumber.replace("n", ""), 10)
			if (lastNumber > -1)
				where.number = { lt: lastNumber };
			//WE COULD DIRECTLY SEARCH ON GROUP MEMBER MAP BUT FINE AS OF NOW
			const limit = query.take ? parseInt(query.take, 10) : take;
			const options = {
				take: limit,
				where: where,
				orderBy: {
					number: "asc"
				},

				include: {
					requests: {
						where: {
							request_sender: user,
							active: true,
							request_accepted: false
						}
					},
					members: {
						where: {
							user_id: user,
							active: true
						}
					}
				}
				// select: {
				// 	groups: {
				// 		select: {
				// 			id: true,
				// 			group_id: true,
				// 			name: true,
				// 			profile_photo: true,
				// 			cover_photo: true,
				// 		}
				// 	}
				// }
			}
			console.log(options);
			const groups = await super.getList(req, 'groups', options);
			const payload = groups;
			console.log(payload);
			return requestHandler.sendSuccess(res, "Groups Fetched Successfully")({ payload });
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = groupsController;
