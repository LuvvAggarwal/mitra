const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
// const BaseController = require('./BaseController');
// const GroupMemberController = require("./GroupsMemberController");
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { createId } = require('../utils/idUtil');
const data_type = require("../config/validations/dataTypes")
const BaseController = require('./BaseController');
const nc = require('./NotificationController');
const take_config = require("../config/takeConfig");
// const { isGroupMember } = require('./GroupsMemberController');
const like_take = take_config.likes;
const comment_take = take_config.comments;
const share_take = take_config.share;
const attachment_take = take_config.attachments;

// const { profile } = require('winston');
const logger = new Logger();
// const nc = new nc() ;
const requestHandler = new RequestHandler(logger);
// const gm = new GroupMemberController(10);
// console.log(gm);
class postsActionController extends BaseController {
	/*********************************************
	 * Param - req - post: req.params.id 
	 * Use - Post with full data -- INTERNAL
	 * Flow - 1 check if user is member
	 * 		  2 get post
	 */
	static async likePost(req, res) {
		try {
			// console.log(req.params);
			const user = req.decoded.payload;
			const user_id = user.id;
			const post = req.params.id
			// console.log(reqParam);
			const schema = {
				user_id: data_type.id,
				post: data_type.id,
				// is_active: Joi.boolean().required(),
			};
			const { error } = Joi.validate({ user_id, post /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const post_query = {
				where: {
					id: post,
					active: true,
				},
				select: {
					id: true,
					rank: true,
					post_category: true,
					user_id: true
				}
			}
			const record = await super.getByCustomOptions(req, "posts", post_query)

			if (!record)
				requestHandler.throwError(400, "bad request", "Post not found")();

			const like_record = await super.getByCustomOptions(req, "like_post", {
				where: {
					post: record.id,
					user_id,
					active: true
				}
			})

			if (like_record)
				requestHandler.throwError(400, "bad request", "Post already liked")();

			// EFFECTIVE QUERY HANDLING
			const data = {
				id: uuid.v4(),
				user_id,
				post: record.id
			};
			// console.log("checking");

			// console.log(options);
			const result = await super.create(req, 'like_post', data);
			const payload = result;
			// console.log(payload);
			const rank = parseFloat((parseFloat(record.rank) + parseFloat((1 / (record.post_category.value * 1000)).toFixed(3))).toFixed(5))
			const updateRank = await super.updateById(req, "posts", {
				rank
			})
			// console.log("Notifying");
			const link_source = "/post/" + record.id
			const notify = await nc.likeNotification(user, record.user_id, link_source)
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'Post Liked')({ payload, notify });
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
	static async unlikePost(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const id = req.params.id;
			const schema = {
				id: data_type.id,
				user: data_type.id
			}
			const { error } = Joi.validate({ id, user /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400,'bad Request', 'invalid Like Id');

			const query = {
				where: {
					id,
					active: true,
				},
				select: {
					user_id: true,
					posts: {
						select: {
							rank: true,
							post_category: {
								select: {
									value: true
								}
							}
						}
					}
				}
			}
			const record = await super.getByCustomOptions(req, "like_post", query)
			// console.log(record);

			if (!record) {
				// console.log("error");
				requestHandler.throwError(400, "bad request", "record not found")();
			}

			if (record.user_id === user) {
				const result = await super.deleteByIdPermanent(req, 'like_post')
				// console.log("result");
				// console.log(result);
				// const payload = result;
				const rank = parseFloat((parseFloat(record.posts.rank) - parseFloat((1 / (record.posts.post_category.value * 1000)).toFixed(3))).toFixed(5))

				req.params.id = result.post;
				const updateRank = await super.updateById(req, "posts", {
					rank
				})
				const payload = { result, updateRank }
				//  _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
				return requestHandler.sendSuccess(res, 'Post Unliked Successfully')({ payload });
			}
			else {
				requestHandler.throwError(400, "bad request", "You cannot unlike post")();
			}
		} catch (err) {
			// console.log(err);
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
	static async getLikes(req, res) {
		try {
			const post = req.params.id;
			let lastNumber = req.params.lastNumber;
			lastNumber = parseInt(lastNumber.replace("n", ""), 10)
			const schema = {
				post: data_type.id,
				lastNumber: data_type.integer
			}
			const { error } = Joi.validate({ post, lastNumber/*is_active: req.body.is_active */ }, schema);

			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const options = {
				take: like_take,
				where: {
					post,

					active: true
				},
				select: {
					id: true,
					number: true,
					posts: {
						select: {
							id: true,
							// number: true,
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
					}
				}
			}
			if (lastNumber > -1) {
				options.where.number = {
					gt: lastNumber
				}
			}
			const payload = await super.getList(req, 'like_post', options);
			return requestHandler.sendSuccess(res, 'Post Likes Fetched Successfully')({ payload });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
	 * Param - req - post: req.params.id 
	 * Use - Post with full data -- INTERNAL
	 * Flow - 1 check if user is member
	 * 		  2 get post
	 */
	static async commentPost(req, res) {
		try {
			// console.log(req.params);
			const user = req.decoded.payload;
			const post = req.params.id
			// console.log(reqParam);
			const schema = {
				user_id: data_type.id,
				post: data_type.id,
				comment: data_type.text_req
				// is_active: Joi.boolean().required(),
			};
			const options = {

				user_id: req.decoded.payload.id,
				post: req.params.id,
				comment: req.body.comment
			}
			const { error } = Joi.validate(options, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const post_query = {
				where: {
					id: post,
					active: true
				},
				select: {
					id: true,
					rank: true,
					post_category: true,
					user_id: true
				}
			}
			const record = await super.getByCustomOptions(req, "posts", post_query)


			if (!record)
				requestHandler.throwError(400, "bad request", "Post not found")();

			// EFFECTIVE QUERY HANDLING
			// const data = {
			// 	user_id, post
			// };
			options.id = uuid.v4()
			// console.log("checking");

			// console.log(options);
			const result = await super.create(req, 'comment_post', options);
			const payload = result
			const rank = parseFloat((parseFloat(record.rank) + parseFloat((2 / (record.post_category.value * 1000)).toFixed(3))).toFixed(5))
			const updateRank = await super.updateById(req, "posts", {
				rank
			})
			const link_source = "/post/" + record.id
			const notify = await nc.commentNotification(user, record.user_id, link_source)
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'Commented on Post successfully')({ payload, notify });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}


	static async updateCommentPost(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const id = req.params.id;
			const comment = req.body.comment
			const schema = {
				id: data_type.id,
				comment: data_type.text_req
			}
			const { error } = Joi.validate({ id, comment /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid Comment Id');



			const record = await super.getById(req, "comment_post", {
				id
			})

			if (!record) {
				requestHandler.throwError(400, "bad request", "record not found")()
			}

			if (record.user_id === user) {
				const result = await super.updateById(req, 'comment_post', { comment })
				// console.log("result");
				// console.log(result);
				const payload = result
				//  _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
				return requestHandler.sendSuccess(res, 'Comment updated Successfully')({ payload });
			}
			else {
				requestHandler.throwError(400, "bad request", "You cannot updated comment")()
			}
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	static async deleteCommentPost(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const id = req.params.id;
			const schema = {
				id: data_type.id,
				user: data_type.id,
			}
			const { error } = Joi.validate({ id, user /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid Comment Id');

			const query = {
				where: {
					id,
					active: true,
				},
				select: {
					user_id: true,
					posts: {
						select: {
							rank: true,
							post_category: {
								select: {
									value: true
								}
							}
						}
					}
				}
			}

			const record = await super.getByCustomOptions(req, "comment_post", query)

			if (!record) {
				requestHandler.throwError(400, "bad request", "record not found")()
			}

			if (record.user_id === user) {
				const result = await super.deleteByIdPermanent(req, 'comment_post')
				// console.log("result");
				// console.log(result);
				const rank = parseFloat((parseFloat(record.posts.rank) - parseFloat((2 / (record.posts.post_category.value * 1000)).toFixed(3))).toFixed(5))

				req.params.id = result.post;
				const updateRank = await super.updateById(req, "posts", {
					rank
				})
				const payload = { result, updateRank }
				// const payload = result
				//  _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
				return requestHandler.sendSuccess(res, 'Comment Deleted Successfully')({ payload });
			}
			else {
				requestHandler.throwError(400, "bad request", "You cannot delete comment")()
			}
		} catch (err) {
			// console.log(err);
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
	static async getComments(req, res) {
		try {
			const post = req.params.id;
			let lastNumber = req.params.lastNumber;
			lastNumber = parseInt(lastNumber.replace("n", ""), 10)
			const schema = {
				post: data_type.id,
				lastNumber: data_type.integer
			}
			const { error } = Joi.validate({ post, lastNumber/*is_active: req.body.is_active */ }, schema);

			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const options = {
				take: comment_take,
				where: {
					post,
					active: true
				},
				select: {
					id: true,
					number: true,
					comment: true,
					posts: {
						select: {
							id: true
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
					}
				}
			}
			if (lastNumber > -1) {
				options.where.number = {
					gt: lastNumber
				}
			}
			const payload = await super.getList(req, 'comment_post', options);
			return requestHandler.sendSuccess(res, 'Post Comments Fetched Successfully')({ payload });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
 * Param - req - post: req.params.id 
 * Use - Post with full data -- INTERNAL
 * Flow - 1 check if user is member
 * 		  2 get post
 */
	static async sharePost(req, res) {
		try {
			// console.log(req.params);
			const user = req.decoded.payload;
			const post = req.params.id
			// console.log(reqParam);
			const schema = {
				user_id: data_type.id,
				post: data_type.id,
				shared_on: data_type.str_50,
				share_link: data_type.str_200_req
				// is_active: Joi.boolean().required(),
			};
			const options = {
				user_id: req.decoded.payload.id,
				post: req.params.id,
				share_link: req.body.share_link,
				shared_on: req.body.shared_on,
			}
			const { error } = Joi.validate(options, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const post_query = {
				where: {
					id: post,
					active: true
				},
				select: {
					id: true,
					rank: true,
					post_category: true,
					user_id: true
				}
			}
			const record = await super.getByCustomOptions(req, "posts", post_query)

			if (!record)
				requestHandler.throwError(400, "bad request", "Post not found")();

			// EFFECTIVE QUERY HANDLING
			// const data = {
			// 	user_id, post
			// };
			// console.log("checking");
			options.id = uuid.v4()
			// console.log(options);
			const result = await super.create(req, 'share_post', options);
			const rank = parseFloat((parseFloat(record.rank) + parseFloat((3 / (record.post_category.value * 1000)).toFixed(3))).toFixed(5))
			// console.log(rank);
			const updateRank = await super.updateById(req, "posts", {
				rank
			})
			const payload = { result, updateRank }
			const link_source = "/post/" + record.id
			const notify = await nc.shareNotification(user, record.user_id, link_source)
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'Post Shared')({ payload, notify });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	//SHARES CANNOT BE DELETED

	/*********************************************
 * Param - req - group_id: req.params.id | Member Request Id
 * Use - Permanent delete Group  | this is not been used | it may be use by internal admin
 * Flow - 1 check if user is admin
 * 		  2 if admin soft delete- active = false
 */
	/* Here not checking group coz this will be used by backend admin May need updation */
	static async getShares(req, res) {
		try {
			const post = req.params.id;
			const lastNumber = req.body.lastNumber
			const schema = {
				post: data_type.id,
				lastNumber: data_type.integer
			}
			const { error } = Joi.validate({ post, lastNumber/*is_active: req.body.is_active */ }, schema);

			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const options = {
				take: share_take,
				where: {
					post,
					active: true
				},
				select: {
					id: true,
					number: true,
					share_link: true,
					shared_on: true,
					posts: {
						select: {
							id: true
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
					}
				}
			}
			if (lastNumber > -1) {
				options.where.number = {
					gt: lastNumber
				}
			}
			const payload = await super.getList(req, 'share_post', options);
			// const rank = record.rank + (2 / (record.post_category.value * 1000))
			// const updateRank = await super.updateById(req, "posts", {
			// 	rank
			// })
			return requestHandler.sendSuccess(res, 'Post Shares Fetched Successfully')({ payload });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}


	static async deleteAttachment(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const user = req.decoded.payload.id;
			const id = req.params.id;
			const schema = {
				id: data_type.id
			}
			const { error } = Joi.validate({ id, user /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid athc Id');

			const record = await super.getById(req, "atachment_post_map", {
				id
			})

			if (!record) {
				requestHandler.throwError(400, "bad request", "record not found")()
			}

			if (record.user_id === user) {
				const result = await super.deleteById(req, 'atachment_post_map')
				// console.log("result");
				// console.log(result);
				const payload = result
				//  _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
				return requestHandler.sendSuccess(res, 'Post Attachment deleted Successfully')({ payload });
			}
			else {
				requestHandler.throwError(400, "bad request", "You cannot delete attachment")()
			}
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	// static async commentPost(req, res) {
	// 	try {
	// 		console.log(req.params);
	// 		// const user = req.decoded.payload;
	// 		// const post = req.params.id
	// 		console.log(reqParam);
	// 		const schema = {
	// 			user_id: data_type.id,
	// 			post: Joi.string().required(),
	// 			comment: data_type.text_req
	// 			// is_active: Joi.boolean().required(),
	// 		};
	// 		const options = {

	// 			user_id: req.decoded.payload.id,
	// 			post: req.params.id,
	// 			comment: req.body.comment
	// 		}
	// 		const { error } = Joi.validate(options, schema);
	// 		requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

	// 		const post_query = {
	// 			where: {
	// 				id: post,
	// 				active: true
	// 			},
	// 			select: {
	// 				rank: true,
	// 				post_category: true
	// 			}
	// 		}
	// 		const record = await super.getByCustomOptions(req, "posts", post_query)


	// 		if (!record)
	// 			requestHandler.throwError(400, "bad request", "Post not found")();

	// 		// EFFECTIVE QUERY HANDLING
	// 		// const data = {
	// 		// 	user_id, post
	// 		// };
	// 		options.id = uuid.v4()
	// 		console.log("checking");

	// 		console.log(options);
	// 		const result = await super.create(req, 'comment_post', options);
	// 		const payload = result
	// 		const rank = record.rank + (2 / (record.post_category.value * 1000))
	// 		const updateRank = await super.updateById(req, "posts", {
	// 			rank
	// 		})
	// 		// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
	// 		return requestHandler.sendSuccess(res, 'Post Commented')({ payload });
	// 	} catch (error) {
	// 		return requestHandler.sendError(req, res, error);
	// 	}
	// }

}

module.exports = postsActionController;
