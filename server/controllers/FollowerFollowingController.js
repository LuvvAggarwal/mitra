const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const { v4 } = require('uuid');
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { profile } = require('winston');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class followerFollowingController extends BaseController {
	/*********************************************
* Param - req - follower, following - body
* Use - GET USER
* Flow - 1 updating if record available, creating record if not
		 2 else throw err
*/
	static async follow(req, res) {
		try {
			const { follower, following } = req.body;
			const schema = {
				follower: Joi.string().required(),
				following: Joi.string().required(),
			};
			const { error } = Joi.validate({ id: reqParam }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const id = v4()
			const query = {follower,following}
			const payload = await super.upsert(req, 'follower_following', { id, follower, following },{follower,following,active: true},query);
			// const payload = _.omit(result, ['created_on', 'updated_on'])
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ payload });
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
				id: Joi.string().required()
			}
			const { error } = Joi.validate({ id: req.params.id }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = { id: req.params.id, active: true }
			const record = await super.getById(req, "follower_following", options)
			if (_.isUndefined(record))
				return requestHandler.sendError(res, 'record not found')();
			
			if (record.follower !== user) {
				requestHandler.throwError(400,'bad request','You cannot unfollow')();
			}
			const payload = await super.deleteById(req, 'follower_following');
			// const payload = _.omit(result, [ 'created_on', 'updated_on'])
			return requestHandler.sendSuccess(res, 'User Deleted Successfully')({ payload });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
* Param - req - follower in body
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
			const { follower,skip } = req.body;
			const schema = {
				follower: Joi.string().required(),
			};
			const { error } = Joi.validate({ follower }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const options = {
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
			}
			const result = await super.getList(req, 'users',options);
			// console.log(userProfile);
			// const userProfileParsed = userProfile
			const payload = _.omit(result, ['created_on', 'updated_on',]);
			return requestHandler.sendSuccess(res, 'User follows fetched Successfully')({ payload });
		} catch (err) {
			console.log('error');
			return requestHandler.sendError(req, res, err);
		}
	}

		/*********************************************
* Param - req - following in body
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
			const { following,skip } = req.body;
			const schema = {
				follower: Joi.string().required(),
			};
			const { error } = Joi.validate({ follower }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const options = {
				skip: skip,
				take: 10, // hard-coded
				where: {
					following,
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
			}
			const result = await super.getList(req, 'users',options);
			// console.log(userProfile);
			// const userProfileParsed = userProfile
			const payload = _.omit(result, ['created_on', 'updated_on',]);
			return requestHandler.sendSuccess(res, 'User followers fetched Successfully')({ payload });
		} catch (err) {
			console.log('error');
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
	static async getRelation(req, res) {
		// console.log(req);

		try {
			const user = req.decoded.payload.id ;
			const { otherUser } = req.body;
			const schema = {
				user: Joi.string().required(),
				otherUser: Joi.string().required(),
			};
			const { error } = Joi.validate({ user,otherUser }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const options = {
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
			let obj = {} ;
			const record = await super.getList(req, 'follower_following',options);
			if (record.length === 0) {
				obj.relation = 'No-Friend'
			} else if(record.length === 1){
				if(record.follower === user)
					obj.relation = 'Follower';
				if(record.follower === otherUser)
					obj.relation = 'Following'
			}else if(obj.length === 2)
					obj.relation = 'Friend'			// console.log(userProfile);
			// const userProfileParsed = userProfile
			return obj ;
		}
			catch(err){
			console.log('error');
			return requestHandler.sendError(req, res, err);
		}
	}


}


module.exports = followerFollowingController;
