const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
// const async = require('async');
const jwt = require('jsonwebtoken');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const BaseController = require('../controllers/BaseController');
const stringUtil = require('../utils/stringUtil');
// const email = require('../utils/email');
// const OAuth2 = google.auth.OAuth2;
// const { Worker, isMainThread } = require('worker_threads');
const data_type = require("../config/validations/dataTypes");

const workerPool = require("workerpool")
const WorkerCon = require('../Worker/WorkerPoolController')
const google = require('googleapis').google;

const config = require('../config/appconfig');
const auth = require('../utils/auth');
// const date = require('joi/lib/types/date');
const uuid = require('uuid');
const { createId } = require('../utils/idUtil');
const { sendEmail, transporter } = require('../threads/mailServer');
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
				email: data_type.email,
				password: data_type.password
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
				where: { email: req.body.email, active: true }
			};
			// console.log('before');

			const userdata = await super.getByCustomOptions(req, 'users', options);
			const user = userdata

			if (!user) {
				requestHandler.throwError(400, 'bad request', 'invalid email address')();
			}
			else {

				const bcryptdata = await bcrypt.compare(req.body.password, user.password).then(
					console.log('. ' + user.password),
					requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials'),
					requestHandler.throwError(500, 'bcrypt error'),
				);

				const payload = _.omit(user, ['created_on', 'updated_on', 'last_login', 'password', 'gender', 'access_token']);
				// const payload = json.parse(payloadData)
				const token = jwt.sign({ payload }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
				const data = {
					last_login: new Date().toISOString(),
					access_token: token
				};
				req.params.id = user.id;
				// console.log('updating');
				const updatedData = await super.updateById(req, 'users', data);
				requestHandler.sendSuccess(res, 'User logged in Successfully')({ token });

			}
		} catch (error) {
			requestHandler.sendError(req, res, error);
		}
	}

	/**
	 * Param - req - unique string
	 * Use - verify user
	 * Flow - 1 get id from uniqueString check if user exists - where: { id }
	 * 		  2 update user data = {
				active: true,
				verified: true
			}
	 */

	static async verify(req, res) {
		try {
			const schema = {
				uniqueString: data_type.str_250_req
				// access_token: Joi.string(),
				// platform: Joi.string().valid('ios', 'android', 'web').required(),
			};
			const uniqueString = req.params.uniqueString
			const { error } = Joi.validate({
				uniqueString: uniqueString
				// access_token: req.body.access_token,
				// platform: req.headers.platform,
			}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			// console.log('finding');
			console.log(uniqueString);
			const id = uniqueString.split("_")[1];
			const options = {
				id
			};
			// console.log('before');
			const user = await super.getById(req, 'users', options);
			// const user = userdata

			if (!user) {
				requestHandler.throwError(400, 'bad request', 'Could not verify user')();
			}
			// else {
			req.params.id = id
			const data = {
				active: true,
				verified: true
			}
			const payload = await super.updateById(req, "users", data)
			requestHandler.sendSuccess(res, 'User verified Successfully')({ payload });

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
				create user active, verified false
* 		  4 send verify link
*/



	static async signUp(req, res) {
		try {
			const data = req.body;
			// const type = /USER|NGO|COUNSALER/;
			// const ph_number = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
			const schema = {
				email: data_type.email,
				// first_name: data_type.name,
				// middle_name: data_type.name,
				// last_name: data_type.name,
				// middle_name : Joi.string(),
				type: data_type.type,
				problem_category: data_type.id,
				password: data_type.password,
				ph_number: data_type.ph_number
			};

			const validate = {
				ph_number: data.ph_number,
				email: data.email,
				// first_name: data.first_name,
				// last_name: data.last_name,
				// middle_name: data.middle_name,
				type: data.type,
				problem_category: data.problem_category,
				password: data.password
			}
			if (data.type === "USER" || "COUNSALER") {
				schema.first_name = data_type.str_100_req;
				schema.middle_name = data_type.str_100;
				// data.middle_name.length !== 100 ? "" : requestHandler.throwError(400,"bad request","Middle name cannot be more than 100 char")(); 
				schema.last_name = data_type.str_100_req;
				validate.first_name = data.first_name
				validate.middle_name = data.middle_name
				validate.last_name = data.last_name

				data.name = data.middle_name.length > 0 ? data.first_name + ' ' + data.middle_name + ' ' + data.last_name : data.first_name + " " + data.last_name;
			}
			if (data.type === 'NGO') {
				schema.name = data_type.str_250_req;
				validate.name = data.name;
			}
			// console.log(schema);
			console.log(validate);
			const { error } = Joi.validate(validate, schema);

			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');


			console.log(data.user_id);
			const options = { where: { email: data.email } };
			const user = await super.getByCustomOptions(req, 'users', options);
			console.log(user);

			if (user) {
				requestHandler.throwError(400, 'bad request', 'invalid email account,email already existed')();
			}
			// const otp = parseInt(Math.random() * 1000000);
			// data.password = otp ;
			const randomString = stringUtil.generateString();

			data.user_id = createId(data.first_name)
			const hashedPass = bcrypt.hashSync(data.password, config.auth.saltRounds);
			data.password = hashedPass;
			data.id = uuid.v4();
			data.active = false;
			data.verified = false
			const obj = _.pick(data, "active", "id", "user_id", "first_name", "middle_name", "last_name", "name", "email", "password", "type", "ph_number", "problem_category")
			const createdUser = await super.create(req, 'users', obj);
			console.log(createdUser);
			if (!(_.isNull(createdUser))) {
				// let message = "";
				const uniqueString = randomString + "_" + createdUser.id;
				// const workerPool = WorkerCon.get()
				// const pool = workerPool.pool('./Wor/ker/thread_functions.js',{minWorkers: 'max'});
				const mailOptions = {
					from: 'luvvaggarwal2002@gmail.com',
					to: createdUser.email,
					subject: 'Email Verification Mitra',
					html: `
					<h2>Hello ${createdUser.name}</h2> <br>
					<a href="http://localhost:3000/verify/${uniqueString}">Click To Verify</a>
					`
				};
				let msg = "";
				const workerPool = WorkerCon.get()
				const message = await workerPool.sendVerifyEmail(mailOptions, msg)

				console.log(message);
				const payload = {
					user: createdUser,
					message
				}
				requestHandler.sendSuccess(res, message, 200)({ payload });
			} else {
				requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
			}
		} catch (err) {
			console.log(err);
			requestHandler.sendError(req, res, err);
		}
	}

	/**
	 * Param - req - email
	 * Use - resend verification link
	 * Flow - 1 check if user exists - where: { email }
	 * 		  2 send verification link
	 */

	static async resendVerificationLink(req, res) {
		try {
			const schema = {
				email: data_type.email
				// access_token: Joi.string(),
				// platform: Joi.string().valid('ios', 'android', 'web').required(),
			};
			const email = req.params.email
			const { error } = Joi.validate({
				email: email
				// access_token: req.body.access_token,
				// platform: req.headers.platform,
			}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			// console.log('finding');
			// console.log(uniqueString);
			// const id = uniqueString.split("_")[1];
			const options = {
				email
			};
			// console.log('before');
			const user = await super.getById(req, 'users', options);
			// const user = userdata

			if (!user) {
				requestHandler.throwError(400, 'bad request', 'User not found')();
			}

			const randomString = stringUtil.generateString();
			const uniqueString = randomString + "_" + user.id;
			const mailOptions = {
				from: 'luvvaggarwal2002@gmail.com',
				to: user.email,
				subject: 'Email Verification Mitra',
				html: `
				<h2>Hello ${user.name}</h2> <br>
				<a href="http://localhost:3000/verify/${uniqueString}">Click To Verify</a>
				`
			};

			let msg = "";
			const workerPool = WorkerCon.get()
			const message = await workerPool.sendVerifyEmail(mailOptions, msg)

			console.log(message);
			const payload = {
				user: user,
				message
			}
			requestHandler.sendSuccess(res, message, 200)({ payload });
			// requestHandler.sendSuccess(res, 'User verified Successfully')({ payload });

		} catch (error) {
			requestHandler.sendError(req, res, error);
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
				email: data_type.email,
				password: data_type.password
			};
			// const randomString = stringUtil.generateString();

			const validate = {
				email: req.params.email,
				password: data.password
			}
			const { error } = Joi.validate(validate, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// data.user_id = createId(data.name)
			const options = { where: { email: req.params.email, active: true } };
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
			console.log(err);
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
			const act = auth.getTokenFromHeader(req)
			const schema = {
				// platform: Joi.string().valid('ios', 'android', 'web').required(),
				access_token: data_type.text_req,
			};
			const { error } = Joi.validate({
				/*platform: req.headers.platform,*/ access_token: act,
			}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			// console.log('before');.
			// console.log(tokenFromHeader);
			const user = req.decoded.payload.id;
			// console.log(user);
			const options = {
				where: {
					access_token: act,
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
			if (delete_access_token) {
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
