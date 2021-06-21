const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
// const async = require('async');
const jwt = require('jsonwebtoken');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const BaseController = require('../controllers/BaseController');
// const stringUtil = require('../utils/stringUtil');
// const email = require('../utils/email');
// const OAuth2 = google.auth.OAuth2;
const google = require('googleapis').google;

const config = require('../config/appconfig');
const auth = require('../utils/auth');
// const date = require('joi/lib/types/date');
const uuid = require('uuid');
const { createId } = require('../utils/idUtil');
// const { Console } = require('winston/lib/winston/transports');
// const {createId} = require("../utils/idUtil");
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const tokenList = {};

class AuthController extends BaseController {

	/*********************************************
 * Param - req - email: req.body.email,
			password: req.body.password,
 * Use - Login user
 * Flow - 1 check if user exists - where: { email: req.body.email }
 * 		  2 if not user throw err
 * 		  3 compare bcrypt password 
 * 		  4 if match - sign jwt
 * 			Update user record - with data = {
					last_login: new Date().toISOString(),
					access_token: token
				};
		  5 if no match throw err
 */

	static async login(req, res) {
		try {
			const schema = {
				email: Joi.string().email().required(),
				password: Joi.string().required(),
				// access_token: Joi.string(),
				// platform: Joi.string().valid('ios', 'android', 'web').required(),
			};
			const { error } = Joi.validate({
				email: req.body.email,
				password: req.body.password,
				// access_token: req.body.access_token,
				// platform: req.headers.platform,
			}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			// console.log('finding');
			const options = {
				where: { email: req.body.email }
			};
			// console.log('before');
			try {

				const userdata = await super.getByCustomOptions(req, 'users', options);
				const user = userdata
				// console.log(user);
				// console.log(" >>>>>>>>>>>> id " + user.id);
				// const json = toJson(user)
				// console.log(json);

				/*const backAgain = JSON.parse(json), (key, value) => {
					if (typeof value === "string" && value.startsWith('BIGINT::')) {
					  return BigInt(value.substr(8));
					}
					return value;
				  });*/
				// requestHandler.sendSuccess(res, 'User logged in Successfully');

				if (!user) {
					requestHandler.throwError(400, 'bad request', 'invalid email address')();
				}
				else {
					// console.log(backAgain);
					// console.log("bcrypting >>>>> " + user.password);
					const bcryptdata = await bcrypt.compare(req.body.password, user.password).then(
						console.log('. ' + user.password),
						requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials'),
						requestHandler.throwError(500, 'bcrypt error'),
					);
					// console.log("comparing pswd");
					// Implemented similar Pakistani social media n/w videos
					req.params.id = user.id;
					// console.log(user.id);
					const payload = _.omit(user, ['created_on', 'updated_on', 'last_login', 'password', 'gender', 'access_token']);
					// const payload = json.parse(payloadData)
					const token = jwt.sign({ payload }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
					const data = {
						last_login: new Date().toISOString(),
						access_token: token
					};
					// console.log('updating');
					const updatedData = await super.updateById(req, 'users', data);
					requestHandler.sendSuccess(res, 'User logged in Successfully')({ token });
				}


			} catch (e) {
				console.log(e);
			}
			// if (!user) {
			// 	requestHandler.throwError(400, 'bad request', 'invalid email address')();
			// }

			// await bcrypt.compare(req.body.password, user.password).then(
			// 	// console.log('. ' + user.password),
			// 	requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials'),
			// 	requestHandler.throwError(500, 'bcrypt error'),
			// );
			// console.log("comparing pswd");
			// // Implemented similar Pakistani social media n/w videos
			// req.params.id = user.id;
			// console.log(user.id);
			// const payload = _.omit(user.dataValues, ['created_on', 'updated_on', 'last_login', 'password', 'gender', 'ph_number', 'profile_photo', 'cover_photo']);
			// const token = jwt.sign({ payload }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
			// const data = {
			// 	last_login: new Date().toISOString(),
			// 	access_token: token
			// };
			// console.log('updating');
			// const updatedUser = await super.updateById(req, 'users', data);
			// console.log("updated " + JSON.stringify(updatedUser));
			// requestHandler.sendSuccess(res, 'User logged in Successfully')({ token, updatedUser });


			// if (req.headers.access_token /*&& req.headers.platform*/) {
			// 	const find = {
			// 			id: user.id,
			// 			access_token: req.headers.access_token,
			// 		};
			// 	const access_token = await super.getByCustomOptions(req, 'users', find);
			// 	const data = {
			// 		userId: user.id,
			// 		access_token: req.headers.access_token,
			// 		// platform: req.headers.platform,
			// 	};

			// 	if (access_token) {
			// 		req.params.id = user.id;
			// 		await super.updateById(req, 'users', data);
			// 	} /*else {
			// 	// 	await super.create(req, 'users', data);
			// 	// }*/
			// } else {
			// 	requestHandler.throwError(400, 'bad request', 'please provide all required headers')();
			// }

			// await bcrypt
			// 	.compare(req.body.password, user.password)
			// 	.then(
			// 		requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials'),
			// 		requestHandler.throwError(500, 'bcrypt error'),
			// 	);
			// const data = {
			// 	last_login: new Date().toISOString(),
			// };
			// req.params.id = user.id;
			// await super.updateById(req, 'users', data);
			// const payload = _.omit(user.dataValues, ['created_on', 'updated_on', 'last_login', 'password', 'gender', 'ph_number', 'profile_photo','cover_photo']);
			// const token = jwt.sign({ payload }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
			// const refreshToken = jwt.sign({
			// 	payload,
			// }, config.auth.refresh_token_secret, {
			// 	expiresIn: config.auth.refresh_token_expiresin,
			// });
			// const response = {
			// 	status: 'Logged in',
			// 	token,
			// 	refreshToken,
			// };
			// tokenList[refreshToken] = response;
			// requestHandler.sendSuccess(res, 'User logged in Successfully')({ token });
		} catch (error) {
			requestHandler.sendError(req, res, error);
		}
	}

	/*********************************************
* Param - req - email: req.body.email,
		password: req.body.password,
		first_name,last_name,middle_name,,type,problem_category in body
* Use - sign up user
* Flow - 1 check if user exists - where: { email: data.email }
* 		  2 if user throw err
* 		  3 set name = fn + mn + ln
				crypt pswd
* 		  4 if match - sign jwt
* 			Update user record - with data = {
				last_login: new Date().toISOString(),
				access_token: token
			};
		  5 create user
		       if err throw
*/



	static async signUp(req, res) {
		try {
			const data = req.body;
			const type = /USER|NGO|COUNSALER/;
			const ph_number = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
			const schema = {
				email: Joi.string().email().required(),
				first_name: Joi.string().required(),
				middle_name: Joi.string(),
				last_name: Joi.string().required(),
				type: Joi.string().regex(type),
				problem_category: Joi.string().required(),
				password: Joi.string().required(),
				ph_number: Joi.string().regex(ph_number).required()
			};
			// const randomString = stringUtil.generateString();

			const validate = {
				ph_number: data.ph_number,
				email: data.email,
				first_name: data.first_name,
				last_name: data.last_name,
				middle_name: data.middle_name,
				type: data.type,
				problem_category: data.problem_category,
				password: data.password
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			data.user_id = createId(data.name)
			const options = { where: { email: data.email } };
			const user = await super.getByCustomOptions(req, 'users', options);
			console.log(user);
			if (user) {
				requestHandler.throwError(400, 'bad request', 'invalid email account,email already existed')();
			}

			// async.parallel([
			// 	function one(callback) {
			// 		email.sendEmail(
			// 			callback,
			// 			config.sendgrid.from_email,
			// 			[data.email],
			// 			' iLearn Microlearning ',
			// 			`please consider the following as your password${randomString}`,
			// 			`<p style="font-size: 32px;">Hello ${data.name}</p>  please consider the following as your password: ${randomString}`,
			// 		);
			// 	},
			// ], (err, results) => {
			// 	if (err) {
			// 		requestHandler.throwError(500, 'internal Server Error', 'failed to send password email')();
			// 	} else {
			// 		logger.log(`an email has been sent at: ${new Date()} to : ${data.email} with the following results ${results}`, 'info');
			// 	}
			// });
			data.name = data.first_name + ' ' + data.middle_name + ' ' + data.last_name

			const hashedPass = bcrypt.hashSync(data.password, config.auth.saltRounds);
			data.password = hashedPass;
			data.id = uuid.v4();
			const obj = _.pick(data, "id", "user_id", "first_name", "last_name", "email", "password", "type", "ph_number", "problem_category")
			const createdUser = await super.create(req, 'users', obj);
			if (!(_.isNull(createdUser))) {
				requestHandler.sendSuccess(res, 'email with your password sent successfully', 201)();
			} else {
				requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	/*********************************************
* Param - req - id: req.params.id,
		password: req.body.password,
* Use - reset password
* Flow - 1 check if user exists - where: { id: req.params.id, active: true}
* 		  2 if !user throw err
* 		  3 crypt new pswd
* 		  4 Update user record - with data = {
				password: data.password
			}
		  5 update user
		  6 if err throw
*/

	//NOT USING ROUTE 
	// RESET FLOW - USER CLICK FORGOT PSWD. LINK TO RESET password SENT ON EMAIL 
	static async resetPswd(req, res) {
		try {
			const data = req.body;

			const schema = {
				id: Joi.string().required(),
				password: Joi.string().required()
			};
			// const randomString = stringUtil.generateString();

			const validate = {
				id: req.params.id,
				password: data.password
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// data.user_id = createId(data.name)
			const options = { where: { id: req.params.id, active: true}};
			const user = await super.getById(req, 'users', options);
			console.log(user);
			if (!user) {
				requestHandler.throwError(400, 'bad request', 'User does not exists.')();
			}
			const hashedPass = bcrypt.hashSync(data.password, config.auth.saltRounds);
			data.password = hashedPass;

			const updateUser = await super.updateById(req, 'users', {
				password: data.password
			});
			if (updateUser) {
				requestHandler.sendSuccess(res, 'password updated successfully', 201)();
			} else {
				requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	//NOT USING IT 👇
	static async refreshToken(req, res) {
		try {
			const data = req.body;
			if (_.isNull(data)) {
				requestHandler.throwError(400, 'bad request', 'please provide the refresh token in request body')();
			}
			const schema = {
				refreshToken: Joi.string().required(),
			};
			const { error } = Joi.validate({ refreshToken: req.body.refreshToken }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const tokenFromHeader = auth.getJwtToken(req);
			const user = jwt.decode(tokenFromHeader);

			if ((data.refreshToken) && (data.refreshToken in tokenList)) {
				const token = jwt.sign({ user }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
				const response = {
					token,
				};
				// update the token in the list
				tokenList[data.refreshToken].token = token;
				requestHandler.sendSuccess(res, 'a new token is issued ', 200)(response);
			} else {
				requestHandler.throwError(400, 'bad request', 'no refresh token present in refresh token list')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	
	/*********************************************
* Param - req - id & access_token from body.decoded.payload & body
* Use - logout user
* Flow - 1 check if update user -where: {
					access_token: req.body.access_token,
					// platform: req.headers.platform,
					id: user
				},
				data: {
					access_token: ""
				}
* 		  2 if delete_access_token.count === 1 success
			else err
*/

	static async logOut(req, res) {
		try {
			console.log('first');
			const schema = {
				// platform: Joi.string().valid('ios', 'android', 'web').required(),
				access_token: Joi.string().required(),
			};
			const { error } = Joi.validate({
				/*platform: req.headers.platform,*/ access_token: req.body.access_token,
			}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			// console.log('before');.
			// console.log(tokenFromHeader);
			const user = req.decoded.payload.id;
			// console.log(user);
			const options = {
				where: {
					access_token: req.body.access_token,
					// platform: req.headers.platform,
					id: user
				},
				data: {
					access_token: ""
				}
			}
			const delete_access_token = await super.updateByCustomWhere(req, 'users', options);
			// req.params.id = access_token.dataValues.id;
			// const deleteFcm = await super.updateById(req, 'users');
			// console.log(delete_access_token);
			if (delete_access_token.count === 1) {
				requestHandler.sendSuccess(res, 'User Logged Out Successfully')();
			} else {
				requestHandler.throwError(400, 'bad request', 'User Already logged out Successfully')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	/*static async signInWithGoogle(req,res){
		const oauth2Client = new OAuth2(config.oauth2Credentials.client_id, config.oauth2Credentials.client_secret, config.oauth2Credentials.redirect_uris[0]);
		const loginLink = oauth2Client.generateAuthUrl({
			access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
			scope: config.oauth2Credentials.scopes // Using the access scopes from our config file
		  });
		  requestHandler.sendSuccess(res, 'a new token is issued ', 200)(loginLink);
	}*/
}
module.exports = AuthController;
