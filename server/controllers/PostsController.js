const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
// const BaseController = require('./BaseController');
// const GroupMemberController = require("./GroupsMemberController");
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const data_type = require("../config/validations/dataTypes");
// const {Worker, isMainThread  } = require('worker_threads');
const WorkerCon = require('../Worker/WorkerPoolController')
// const NotificationController = require("../controllers/NotificationController");
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { createId } = require('../utils/idUtil');
const BaseController = require('./BaseController');
const take_config = require("../config/takeConfig");
const { isGroupMember } = require('./GroupsMemberController');
// const { createAttachmentRecord } = require('./PostsActionController');
const nc = require('../controllers/NotificationController');
const { post_children } = require('../config/softDeleteCascade');
const take = take_config.posts;

// const workerpool = require('workerpool');
// const { post_type } = require('../config/validations/dataTypes');
// const { profile } = require('winston');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
// const nc = new notificationController()
// const gm = new GroupMemberController(10);
// console.log(gm);
class postsController extends BaseController {
	/*********************************************
	 * Param - req - post_id: req.params.id 
	 * Use - Post with full data -- INTERNAL
	 * Flow - 1 check if user is member
	 * 		  2 get post
	 */
	static async getPostById(req, res) {
		try {
			console.log(req.params);
			const reqParam = req.params.id;
			console.log(reqParam);
			const schema = {
				id: data_type.id,
				// is_active: Joi.boolean().required(),
			};
			const { error } = Joi.validate({ id: reqParam, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid Post Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					id: reqParam,
					// active: true
					// active: req.body.is_active
				},

				include: {
					atachments: true,
					_count: {
						select: {
							comments: true,
							likes: true,
							shares: true,
						}
					},
					users: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							bio: true,
						}
					},
					groups: {
						select: {
							group_id: true,
							name: true,
							profile_photo: true
						}
					},
				}
			};
			console.log("checking");

			console.log(options);
			const result = await super.getByCustomOptions(req, 'posts', options);
			const payload = result
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'Post Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	/*********************************************
	 * Param - req - post: req.params.id 
	 * Use - soft delete Post
	 * Flow - 1 get post
	 * 		  2 if !post throw err
	 * 		  3 setting canDelete var based user and group admin
	 * if can Delete - success 
	 */
	static async deletePostById(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const id = req.params.id;
			const schema = {
				id: data_type.id
			}
			const { error } = Joi.validate({ id, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid Post Id');

			const record = await super.getById(req, "posts", {
				id, user_id: user
			})

			if (!record) {
				requestHandler.throwError(400, "bad request", "Post not found")
			}

			let canDelete = false
			if (record.group_id) {
				const member_check = await isGroupMember(req, res, { user_id: user, group_id: record.group_id });
				if (member_check.isAdmin || record.user_id === user) {
					canDelete = true;
				}
			}

			if (record.user_id === user && !record.group_id)
				canDelete = true

			if (canDelete) {
				const children_data = post_children()
				const result = await super.deleteByIdCascade(req, 'posts',children_data)
				console.log("result");
				console.log(result);
				const payload = result
				//  _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
				return requestHandler.sendSuccess(res, 'Post Deleted Successfully')({ payload });
			}
			else {
				requestHandler.throwError(400, "bad request", "You cannot delete post")
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
			const result = await super.deleteByIdPermanent(req, 'posts');
			return requestHandler.sendSuccess(res, 'Post Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}


	/*********************************************
	 * Param - req - post_id: req.params.id | Member Request Id
	 * Use - Approve post in group
	 * Flow - get post 
	 * 		  if no post throw err
	 * 		  member_check if admin - success approve
	 * 		  else throw err
	 */

	static async approvePost(req, res) {
		// console.log(req);
		// OVERVIEW OF PROFILE
		try {
			const reqParam = req.params.id;
			const user = req.decoded.payload.id;
			// const user = req.decoded.payload.id;
			const schema = {
				id: data_type.id,
			};
			const { error } = Joi.validate({ id: reqParam }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid Post Id');

			const query = {
				where: {
					id: reqParam,
					active: true,
					NOT: [{ group_id: null }]
				},
				select: {
					id: true,
					group_id: true,
					users: {
						select: {
							id: true,
							name: true
						}
					}
				}
			}
			const post = await super.getByCustomOptions(req, "posts", query)
			if (!post)
				requestHandler.throwError(400, "bad request", "Post not found.")();
			// const member_check = await this._isGroupMember(user, reqParam);
			const member_check = await isGroupMember(req, res, { user_id: user, group_id: post.group_id })

			if (member_check.isAdmin) {
				const result = await super.updateById(req, 'posts', { approved: true });
				const payload = _.omit(result, ['created_on', 'active', 'updated_on',])
				const link_source = "/post/" + post.id;
				const notify = nc.groupPostApprovedNotification(user, post.users, link_source)
				return requestHandler.sendSuccess(res, 'Post approved')({ payload, notify });
			}
			else {
				requestHandler.throwError(400, "bad request", "You are not authorized to approve post")()
			}

		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}


	/*********************************************
	 * Param - req - post_id: req.params.id 
	 * 		   id: req.params.id,
				title: data.title,
				description: data.description,
				type: data.type,
				category: data.category,
				visibility: data.visibility,
	 * Use - Update post
	 * Flow - 1 check if post exits . if ! throw err
	 * 		  2 if user === post.user_id - success update
	 * 		  3 else throw err
	 */
	static async updatePost(req, res) {
		try {
			const data = req.body;
			// const gruop = req.params.id;
			const user = req.decoded.payload.id;

			const visibility = /PUBLIC|PRIVATE|FRIENDS/;
			const schema = {
				id: data_type.id,
				title: data_type.str_200_req,
				description: data_type.text_req,
				type: data_type.post_type,
				category: data_type.id,
				// user_id: data_type.id,
				// group_id: Joi.string(),
				// approved: Joi.boolean(),
				visibility: data_type.visibility,
			}
			const options = {
				id: req.params.id,
				title: data.title,
				description: data.description,
				type: data.type,
				category: data.category,
				// user_id: user,
				// group_id: data.group_id,
				// approved: data.approved,
				visibility: data.visibility,
			};
			console.log("req > ");
			console.log(req.body);
			const { error } = Joi.validate(options, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			// options.group_id = createId(data.name);
			// options.updated_by = user;
			console.log("updating .... ");
			// ISME DONO COVER HO GYE GROUP CHECK AND MEMBER CHECK
			const record = await super.getById(req, "posts", {
				id: req.params.id, active: true
			});
			if (!record)
				requestHandler.throwError(400, "bad request", "Post not found")
			if (record.user_id === user) {
				const result = await super.updateById(req, 'posts', options);
				console.log(result);
				const payload = _.omit(result, ['created_on', 'updated_on', 'active']);
				return requestHandler.sendSuccess(res, 'Post updated Successfully')({ payload });
			}
			else {
				return requestHandler.throwError(400, 'bad request', "User is not authorized to update post.")()
			}
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
	 * Param - req - {
				title: data.title,
				description: data.description,
				type: data.type,
				category: data.category,
				user_id: user,
				group_id: data.group_id,
				approved: data.approved,
				visibility: data.visibility,
			};

	 * 		   Many based on model
	 * Use - Create group
	 * Flow - 1 create post
	 * 		  3 else throw err
	 */
	static async createPost(req, res) {
		try {
			const data = req.body;
			// const gruop = req.params.id;
			const user = req.decoded.payload.id;
			const attachments = req.files
			const type = /TEXT|MULTIMEDIA|DOCUMENT/;
			const visibility = /PUBLIC|PRIVATE|FRIENDS/;

			if (attachments.length > 5)
				requestHandler.throwError(400, "bad request", "You can only post 5 attachments")

			const schema = {
				title: data_type.str_200_req,
				description: data_type.text_req,
				type: data_type.post_type,
				category: data_type.id,
				user_id: data_type.id,
				group_id: data_type.id_opt,
				// approved: data_type.boolean,
				visibility: data_type.visibility,
			}
			const options = {
				title: data.title,
				description: data.description,
				type: data.type,
				category: data.category,
				user_id: user,
				group_id: data.group_id,
				// approved: data.approved,
				visibility: data.visibility,
			};

			// ATTACHMENTS KA DHYAN RAKHNA HAI

			const { error } = Joi.validate(options, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			options.id = uuid.v4()
			options.rank = 0
			// options.group_id = createId(data.name);
			// options.created_by = user;
			// options.updated_by = user
			console.log("req > ");
			console.log(req.files);
			// console.log(req);
			console.log(options);
			if(options.group_id){
				const member_check = await isGroupMember(req, res, { user_id: user, group_id: group });
				if (member_check.isAdmin) {
					options.approved = true ;
				}
				if (member_check.isMember && !member_check.isAdmin) {
					options.approved = false ;
				}
				else{
					requestHandler.throwError(400, "bad request", "You are not group member")() ;
				}
			}
			
			let attachment_records;
			const result = await super.create(req, 'posts', options);
			if (attachments.length > 0) {
				const workerPool = WorkerCon.get()
				attachment_records = await workerPool.createAttachments(result.id, attachments)
				console.log(JSON.stringify(workerPool.stats())); 
			}
			const payload = _.omit(result, ['created_on', 'updated_on', 'active']);
			payload.attachments = attachment_records;
			// const payload = { profile, addMember }
			return requestHandler.sendSuccess(res, 'Post created Successfully')({ payload });
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}
	/*********************************************
	 * Param - req - user_id: req.params.id && lastRank
	 * Use - feed
	 * Flow -get user following i,e whome user follow
	 * 		 get user groups
	 * 	     getting posts  where: {
					OR: [
						{ user_id: { in: following } },
						{ group_id: { in: groups }, approved: true }
					],
					visibility: { not: "PRIVATE" },
					active: true
				},
				orderBy: {
					rank: 'desc',
				}, + count of likes, shares, comment
	   */

	static async getGroupPosts(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			const user = req.decoded.payload.id;
			const group_id = req.params.id;
			const lastNumber = req.body.lastNumber
			// const lastRank = req.body.lastRank
			// const group = req.params.id;
			// const member_check = await super.isGroupMember(req, res, { group_id: group, user_id: user })
			// console.log(member_check);
			// console.log(JSON.stringify(member_check));
			const schema = {
				group_id: data_type.id,
				lastNumber: data_type.integer
				// lastRank: data_type.number
			}
			const { error } = Joi.validate({ group_id, lastNumber /*lastRank: lastRankis_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			console.log('GETTING');

			const options = {
				take: take,
				where: {
					group_id,
					// visibility: { not: "PRIVATE" },
					active: true,
				},
				orderBy: {
					number: 'desc',
				},
				select: {
					id: true,
					title: true,
					description: true,
					rank: true,
					groups: {
						select: {
							group_id: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
						}
					},
					users: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							// cover_photo: true,
						}
					},
					post_category: {
						select: {
							id: true,
							name: true,
							value: true
						}

					},
					atachments: true,
					_count: {
						select: {
							comments: true,
							likes: true,
							shares: true,
						}
					}
				}
			}

			const member_check = await isGroupMember(req, res, { user_id: user, group_id: group });

			if (member_check.isMember && !member_check.isAdmin) {
				options.where.visibility =  { not: "PRIVATE" } ;
			}
			if (!member_check.isMember) {
				options.where.visibility = "PUBLIC" ;
			}

			if (lastNumber > -1)
				options.where.number = { lt: lastNumber };
			console.log(options);



			const payload = await super.getList(req, 'posts', options);

			// const payload = user_grp_map;
			console.log(payload);
			return requestHandler.sendSuccess(res, 'Group Posts')({ payload });
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	static async getMyPosts(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user_id = req.decoded.payload.id;
			const lastNumber = req.body.lastNumber
			// const group = req.params.id;
			// const member_check = await super.isGroupMember(req, res, { group_id: group, user_id: user })
			// console.log(member_check);
			// console.log(JSON.stringify(member_check));
			const schema = {
				user_id: data_type.id,
				lastNumber: data_type.integer
			}
			const { error } = Joi.validate({ user_id, lastNumber/*lastRank: lastRankis_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			console.log('GETTING');


			//WE COULD DIRECTLY SEARCH ON GROUP MEMBER MAP BUT FINE AS OF NOW
			const options = {
				take: take,
				where: {
					user_id,
					// visibility: { not: "PRIVATE" },
					active: true,
				},
				orderBy: {
					number: 'desc',
				},
				select: {
					id: true,
					number: true,
					title: true,
					description: true,
					rank: true,
					groups: {
						select: {
							group_id: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
						}
					},
					users: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							// cover_photo: true,
						}
					},
					post_category: {
						select: {
							id: true,
							name: true,
							value: true
						}

					},
					atachments: true,
					_count: {
						select: {
							comments: true,
							likes: true,
							shares: true,
						}
					}
				}
			}
			if (lastNumber > -1)
				options.where.number = { lt: lastNumber };
			console.log(options);
			const payload = await super.getList(req, 'posts', options);
			// const payload = user_grp_map;
			console.log(payload);
			return requestHandler.sendSuccess(res, 'My Posts')({ payload });
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	static async getFeed(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const lastRank = req.body.lastRank;
			// const group = req.params.id;
			// const member_check = await super.isGroupMember(req, res, { group_id: group, user_id: user })
			// console.log(member_check);
			// console.log(JSON.stringify(member_check));
			const schema = {
				user: data_type.id,
				lastRank: data_type.number
			}
			const { error } = Joi.validate({ user, lastRank/*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			console.log('GETTING');

			const following_records = await super.getList(req, "follower_following", {
				where: {
					follower: user,
					active: true
				},
				select: {
					following: true
				}
			})
			const following = following_records.map(function (obj) {
				return obj.id;
			});

			const group_records = await super.getList(req, "group_member_map", {
				where: {
					user_id: user,
					active: true
				},
				select: {
					group_id: true
				}
			})
			const groups = group_records.map(function (obj) {
				return obj.id;
			});

			//WE COULD DIRECTLY SEARCH ON GROUP MEMBER MAP BUT FINE AS OF NOW
			const options = {
				take: take,
				where: {
					OR: [
						{ user_id: { in: following } },
						{ group_id: { in: groups }, approved: true }
					],
					visibility: { not: "PRIVATE" },
					active: true,
				},
				orderBy: [
					{
						rank: 'desc',
					},
					{
						number: 'desc',
					},
				],
				select: {
					id: true,
					title: true,
					description: true,
					rank: true,
					groups: {
						select: {
							group_id: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
						}
					},
					users: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							// cover_photo: true,
						}
					},
					post_category: {
						select: {
							id: true,
							name: true,
							value: true
						}

					},
					atachments: true,
					_count: {
						select: {
							comments: true,
							likes: true,
							shares: true,
						}
					}
				}
			}
			if (lastRank > -1)
				options.where.rank = { lt: lastRank };
			console.log(options);
			const payload = await super.getList(req, 'posts', options);
			// const payload = user_grp_map;
			console.log(payload);
			return requestHandler.sendSuccess(res, 'Feed Posts')({ payload });
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	static async getPopular(req, res) {
		try {
			const lastRank = req.body.lastRank;
			const schema = {
				// user: data_type.id,
				lastRank: data_type.number
			}
			const { error } = Joi.validate({ lastRank/*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			console.log('GETTING');


			//WE COULD DIRECTLY SEARCH ON GROUP MEMBER MAP BUT FINE AS OF NOW
			const options = {
				take: take,
				where: {
					active: true,
				},
				orderBy: [
					{
						rank: 'desc',
					},
				],
				select: {
					id: true,
					title: true,
					description: true,
					rank: true,
					groups: {
						select: {
							group_id: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
						}
					},
					users: {
						select: {
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							// cover_photo: true,
						}
					},
					post_category: {
						select: {
							id: true,
							name: true,
							value: true
						}

					},
					atachments: true,
					_count: {
						select: {
							comments: true,
							likes: true,
							shares: true,
						}
					}
				}
			}
			if (lastRank > -1)
				options.where.rank = { lt: lastRank };
			console.log(options);
			const payload = await super.getList(req, 'posts', options);
			// const payload = user_grp_map;
			console.log(payload);
			return requestHandler.sendSuccess(res, 'Popular Posts')({ payload });
		} catch (err) {
			console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = postsController;
