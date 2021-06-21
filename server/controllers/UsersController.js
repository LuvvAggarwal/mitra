const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const auth = require('../utils/auth');
const json = require('../utils/jsonUtil');
// const { profile } = require('winston');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class usersController extends BaseController {
	// NOTE IT MAY NOT NEED TO CHECK ALL THESE
	/*********************************************
* Param - req - id: req.params.id,
* Use - GET USER
* Flow - 1 check if user's profile - where: { id: req.params.id}
* 		 2 if user - success - user data
		 3 else throw err
*/
// NEED TO IMPLEMENT THIS LOGIC PART
	static async getUserById(req, res) {
		try {
			const reqParam = req.params.id;
			const schema = {
				id: Joi.string().required(),
			};
			const { error } = Joi.validate({ id: reqParam }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const options = {
				where: {
					id: reqParam
				},
				include: {
					problem_category_problem_categoryTousers: {
						select: {
							name: true,
							description: true
						}
					}
				}
			};
			const result = await super.getByCustomOptions(req, 'users', options);
			const payload = _.omit(result, ['access_token', 'password', 'theme', 'visibility', 'notification','created_on', 'updated_on'])
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

		/*********************************************
* Param - req - id: req.params.id,
* Use - soft delete USER
* Flow - 1 check if user's profile - where: { id : req.params.id, active: true }
		 2 if not user throw err
		 3 if req.params.id === user ==> success deleteById 
*/
	static async deleteById(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const schema= {
				id: Joi.string().required()
			}
			const { error } = Joi.validate({id: req.params.id}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = { id: req.params.id, active: true }
			const user = await super.getById(req, "users", options)
			if (_.isUndefined(user))
				return requestHandler.sendError(res, 'User not found')();
			if (req.params.id === user) {
				const result = await super.deleteById(req, 'users');
				const payload = _.omit(result, ['access_token', 'password', 'theme', 'visibility', 'notification','created_on', 'updated_on'])
				return requestHandler.sendSuccess(res, 'User Deleted Successfully')({ payload });
			}
			else {
				return requestHandler.throwError(400, 'bad request', 'User cannot be deleted')();
			}
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}

	// NOT USING AS PER NOW 
	static async deleteByIdAdmin(req, res) {
		try {
			const result = await super.deleteByIdPermanent(req, 'users');
			return requestHandler.sendSuccess(res, 'User Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	
	/*********************************************
* Param - req - id: req.params.id,
* Use - GET USER
* Flow - 1 check if user's profile - where: { id: req.params.id,active: true}
* 		  2 if user visiblity public  
* 		  3 user full details posts, groups, follower, following
		  4 if user visiblity friend
	      5 check friend status 
		  6 if friend show user full details posts, groups, follower, following
		  7 if user visiblity private || not friend
		  8 show user name,problem_category follower, following count
*/
// NEED TO IMPLEMENT THIS LOGIC PART
	static async getProfile(req, res) {
		// console.log(req);
		try {
			console.log('getting profile');
			const tokenFromHeader = auth.getJwtToken(req);
			const user = jwt.decode(tokenFromHeader);
			console.log(user.payload.id);
			const schema= {
				id: Joi.string().required()
			}
			const { error } = Joi.validate({id: req.params.id}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = {
				id: user.payload.id,
				active: true
			};
			const userProfile = await super.getById(req, 'users', options);
			console.log(userProfile);
			// const userProfileParsed = userProfile
			const payload = _.omit(userProfile, ['created_on', 'updated_on', 'last_login', 'password', 'access_token']);
			return requestHandler.sendSuccess(res, 'User Profile fetched Successfully')({ payload });
		} catch (err) {
			console.log('error');
			return requestHandler.sendError(req, res, err);
		}
	}
	/*********************************************
* Param - req - id: req.params.id,
		  Many params in body
* Use - UPDATE USER
* Flow - 1 check if user's profile - where: id: req.params.id,active: true}
* 		  2 if not user throw err
		 3 else - success - update by id
*/
	static async updateProfile(req, res) {
		try {
			const tokenFromHeader = auth.getJwtToken(req);
			// const user = 
			const ph_number = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
			const gender = /MALE|FEMALE|OTHER/;
			const visibility = /PUBLIC|PRIVATE|FRIENDS/;
			const theme = /LIGHT|DARK/;
			const notification = /IMPORTANT|STANDARD|NO_NOTIFICATION/;
			const schema = {
				first_name: Joi.string(),
				last_name: Joi.string(),
				middle_name: Joi.string(),
				name: Joi.string(),
				address: Joi.string(),
				ph_number: Joi.string().regex(ph_number),
				profile_photo: Joi.string(),
				cover_photo: Joi.string(),
				bio: Joi.string(),
				occupation: Joi.string(),
				experience: Joi.number().integer(),
				gender: Joi.string().regex(gender),
				help_type: Joi.string(),
				problem_category: Joi.string(),
				registration_code: Joi.string(),
				visibility: Joi.string().regex(visibility),
				theme: Joi.string().regex(theme),
				notification: Joi.string().regex(notification),
			}
			const data = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				middle_name: req.body.middle_name,
				name: req.body.name,
				address: req.body.address,
				ph_number: req.body.ph_number,
				profile_photo: req.body.profile_photo,
				cover_photo: req.body.cover_photo,
				gender: req.body.gender,
				bio: req.body.bio,
				occupation: req.body.occupation,
				experience: req.body.experience,
				problem_category: req.body.problem_category,
				registration_code: req.body.registration_code,
				help_type: req.body.help_type,
				visibility: req.body.visibility,
				theme: req.body.theme,
				notification: req.body.notification,
			};

			console.log("req > ");
			console.log(req.body);
			const { error } = Joi.validate(data, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = {
				id: req.params.id,
				active: true,
			}
			const user_data = await super.getById(req, "users", options)
			if (_.isUndefined(user_data))
				return requestHandler.throwError(400,'bad request', 'User not found')();
			const userProfile = await super.updateById(req, 'users', data);
			const payload = _.omit(userProfile, ['created_on', 'updated_on', 'last_login_date', 'password', 'access_token']);
			return requestHandler.sendSuccess(res, 'User Profile updated Successfully')({ payload });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}


}

module.exports = usersController;
