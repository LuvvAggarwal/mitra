const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const { v4 } = require('uuid');
const take_config = require("../config/takeConfig")
const take = take_config.follower_following;
const data_type = require("../config/validations/dataTypes")
const nc = require('../controllers/NotificationController');
// const nc = new notificationController()
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { profile } = require('winston');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class followerFollowingController extends BaseController {
	/*********************************************
* Param - req - following - body
* Use - GET USER
* Flow - 1 updating if record available, creating record if not
		 2 else throw err
*/
	static async follow(req, res) {
		try {
			const follower = req.decoded.payload.id
			const name = req.decoded.payload.name
			const user_id = req.decoded.payload.user_id
			const following  = req.params.id;
			// console.log(follower);
			// console.log(following);
			const schema = {
				follower: data_type.id,
				following: data_type.id,
			};
			const { error } = Joi.validate({ follower, following }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			if (follower === following)
				requestHandler.throwError(400, 'bad request', 'You cannot follow yourself')()
			
			const count = await super.count(req,"follower_following",{where: {follower,active: true}})
			if (count > 1000)
				requestHandler.throwError(400, 'bad request', 'You are already following 1000 people')()
			
			const id = v4()
			const query = {
				follower, following, active: true
			}
			// console.log(query);
			const record = await super.getByCustomOptions(req, "follower_following", { where: query });
			if (record)
				requestHandler.throwError(400, 'bad request', 'You are already following')()
			const payload = await super.create(req, 'follower_following', { id, follower, following });
			// const update = await super.raw()
			// const updateFollowCount = await super.updateById(r)
			const link_source = "/users/" + user_id;
			const notify = nc.newFollowNotification({ id: follower, name }, following, link_source);
			// const payload = _.omit(result, ['created_on', 'updated_on'])
			return requestHandler.sendSuccess(res, 'User followed successfully')({ payload, notify });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	/*********************************************
* Param - req - id: req.params.id,
* Use - unfollow USER
* Flow - 1 check if follower_following - where: { id : req.params.id, active: true }
	 2 if not throw err
	 3 if record.follower !== user throw err
	 3 if record.follower !== user ==> success deleteById 
*/
	static async unfollow(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			const user = req.decoded.payload.id;
			const schema = {
				id: data_type.id
			}
			const { error } = Joi.validate({ id: req.params.id }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = { id: req.params.id, active: true }
			const record = await super.getById(req, "follower_following", options)
			if (_.isUndefined(record))
				return requestHandler.sendError(res, 'record not found')();

			if (record.follower !== user) {
				requestHandler.throwError(400, 'bad request', 'You cannot unfollow')();
			}
			const payload = await super.deleteById(req, 'follower_following');
			// const payload = _.omit(result, [ 'created_on', 'updated_on'])
			return requestHandler.sendSuccess(res, 'Unfollowed Successfully')({ payload });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
* Param - req - follower as user, skip
* Use - GET list of users where user = follower
* Flow - list of follower_following - where - 
				skip: skip,
				take: 10, // hard-coded
				where: {
					follower: follower,
					active: true
				},
				select: {
					id: true,
					number: true,
					following_users: {
						select: {
							id: true,
							user_id: true,
							name: true,
							profile_photo: true
						}
					}
				}
*/
	static async getFollowing(req, res) {
		// console.log(req);
		try {
			const follower = req.params.user
			let lastNumber = req.params.lastNumber
			// console.log(lastNumber);
			lastNumber = parseInt(lastNumber.replace("n", ""), 10);
			const schema = {
				follower: data_type.id,
				lastNumber: data_type.integer
			};
			const { error } = Joi.validate({ follower, lastNumber }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const options = {
				// skip: skip,
				take: take, // hard-coded
				where: {
					follower: follower,
					active: true
				},
				orderBy: {
					number: "asc"
				},
				select: {
					id: true,
					number: true,
					following_user: {
						select: {
							id: true,
							user_id: true,
							name: true,
							cover_photo: true,
							profile_photo: true
						}
					}
				}
			}
			if (lastNumber > -1) {
				options.where.number = { gt: lastNumber }
			}
			const payload = await super.getList(req, 'follower_following', options);
			// console.log(userProfile);
			// const userProfileParsed = userProfile
			// let payload = _.omit(result, ['created_on', 'updated_on',]);

			// console.log(payload);
			return requestHandler.sendSuccess(res, 'User following fetched Successfully')({ payload });
		} catch (err) {
			// console.log('error');
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
* Param - req - following as user,skip
* Use - GET list of users following user
* Flow - list of follower_following - where - 
			skip: skip,
			take: 10, // hard-coded
			where: {
				following: following,
				active: true
			},
			select: {
				id: true,
				number: true,
				follower_users: {
					select: {
						id: true,
						user_id: true,
						name: true,
						profile_photo: true
					}
				}
			}
*/
	static async getFollowers(req, res) {
		// console.log(req);
		try {
			const following = req.params.user
			// console.log(following);
			let lastNumber = req.params.lastNumber
			lastNumber = parseInt(lastNumber.replace("n", ""), 10);
			const schema = {
				following: data_type.id,
				lastNumber: data_type.integer,
			};
			const { error } = Joi.validate({ following, lastNumber }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const options = {
				// skip: skip,
				take: take, // hard-coded
				where: {
					following: following,
					active: true
				},
				orderBy: {
					number: "asc"
				},
				select: {
					id: true,
					number: true,
					follower_user: {
						select: {
							id: true,
							user_id: true,
							name: true,
							cover_photo: true,
							profile_photo: true
						}
					}
				}
			}
			if (lastNumber > -1) {
				options.where.number = { gt: lastNumber }
			}
			const payload = await super.getList(req, 'follower_following', options);
			// console.log(userProfile);
			// const userProfileParsed = userProfile
			// const payload = _.omit(result, ['created_on', 'updated_on',]);
			// console.log(payload);
			return requestHandler.sendSuccess(res, 'User followers fetched Successfully')({ payload });
		} catch (err) {
			// console.log('error');
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
* Param - req - other in body
* Use - relation ship of user with otherUser
* Flow - getting list where - const options = {
			where: {
				OR: [
					{
						follower : otherUser,
						following : user
					},
					{
						follower : user,
						following : otherUser
					}
				],
				active: true
			}
		}
	
	if (record.length === 0) {
			obj.relation = 'No-Friend'
		} 
	else if(record.length === 1){
			if(record.follower === user)
				obj.relation = 'Follower';
			if(record.follower === otherUser)
				obj.relation = 'Following'
		}
	else if(obj.length === 2)
				obj.relation = 'Friend'	
*/
	static async getRelation(req, res, otherUser) {
		// console.log(req);

		try {
			const user = req.decoded.payload.id;
			// const { otherUser } = req.body;
			// console.log(user + "  " + otherUser);
			const schema = {
				user: data_type.id,
				otherUser: data_type.id,
			};
			const { error } = Joi.validate({ user, otherUser }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = {
				where: {
					active: true,
					OR: [
						{
							follower: otherUser,
							following: user
						},
						{
							follower: user,
							following: otherUser
						}
					]
				}
			}
			let obj = {};
			const record = await super.getList(req, 'follower_following', options);
			if (record.length === 0) {
				obj.relation = 'No-Friend'
			} else if (record.length === 1) {
				if (record.follower === user)
					obj.relation = 'Follower';
				if (record.follower === otherUser)
					obj.relation = 'Following'
			} else if (obj.length === 2)
				obj.relation = 'Friend'			// console.log(userProfile);
			// const userProfileParsed = userProfile
			return obj.relation;
		}
		catch (err) {
			// console.log('error');
			return requestHandler.throwError(400, "bad request", err.message)({err});
		}
	}


}


module.exports = followerFollowingController;
