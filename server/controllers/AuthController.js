const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const async = require('async');
const jwt = require('jsonwebtoken');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const BaseController = require('../controllers/BaseController');
const stringUtil = require('../utils/stringUtil');
const email = require('../utils/email');
const config = require('../config/appconfig');
const auth = require('../utils/auth');
const date = require('joi/lib/types/date');
const uuid = require('uuid');
const { Console } = require('winston/lib/winston/transports');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const tokenList = {};

class AuthController extends BaseController {
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
			console.log('finding');
			const options = { email: req.body.email };
			console.log('before');
			try {

				const userdata = await super.getByCustomOptions(req, 'users', options);
				const user = userdata[0]
				console.log(user);
				console.log(" >>>>>>>>>>>> id " + user.id);
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
					console.log("bcrypting >>>>> " + user.password);
					const bcryptdata = await bcrypt.compare(req.body.password, user.password).then(
						console.log('. ' + user.password),
						requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials'),
						requestHandler.throwError(500, 'bcrypt error'),
					);
					console.log("comparing pswd");
					// Implemented similar Pakistani social media n/w videos
					req.params.id = user.id;
					console.log(user.id);
					const payload = _.omit(user, ['created_on', 'updated_on', 'last_login', 'password', 'gender', 'ph_number', 'profile_photo', 'cover_photo']);
					console.log(payload)
					const jsonStringify = JSON.stringify(user, (key, value) =>
					typeof value === "bigint" ? value.toString() + "n" : value
					);
					const jsonParsed = JSON.parse(jsonStringify)
					const token = jwt.sign({ payload : jsonParsed}, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
					const data = {
						last_login: new Date().toISOString(),
						access_token: token
					};
					console.log('updating');
					const updatedData = await super.updateById(req, 'users', data);
					const updatedUser = updatedData
					console.log(updatedData);
					const json2 = JSON.stringify(updatedUser, (key, value) =>
						typeof value === "bigint" ? value.toString() + "n" : value
					);
					requestHandler.sendSuccess(res, 'User logged in Successfully')({ token, json2 });
					// res.status(200).json({
					// 	msg: "login",
					// 	data: json2
					// })
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

	static async signUp(req, res) {
		try {
			const data = req.body;
			let pattern = /USER|NGO|COUNSALER/;
			const schema = {
				email: Joi.string().email().required(),
				first_name: Joi.string().required(),
				middle_name: Joi.string().required(),
				last_name: Joi.string().required(),
				type: Joi.string().regex(pattern),
				problem_category: Joi.string().required(),
				password: Joi.string().required()
			};
			const randomString = stringUtil.generateString();

			const { error } = Joi.validate({ email: data.email, first_name: data.first_name, last_name: data.last_name, middle_name: data.middle_name, type: date.type, problem_category: data.problem_category, password: data.password }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = { OR: [{ email: data.email }, { user_id: data.user_id }] };
			const user = await super.getByCustomOptions(req, 'users', options);
			console.log(user);
			if (user.length > 0) {
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

			const hashedPass = bcrypt.hashSync(data.password, config.auth.saltRounds);
			data.password = hashedPass;
			data.id = uuid.v4();
			let obj = _.pick(data, "id", "user_id", "first_name", "last_name", "email", "password", "type", "ph_number", "problem_category")
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

	static async logOut(req, res) {
		try {
			const schema = {
				// platform: Joi.string().valid('ios', 'android', 'web').required(),
				access_token: Joi.string(),
			};
			const { error } = Joi.validate({
				/*platform: req.headers.platform,*/ access_token: req.body.access_token,
			}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const tokenFromHeader = auth.getJwtToken(req);
			const user = jwt.decode(tokenFromHeader);
			const options = {
				where: {
					access_token: req.body.access_token,
					// platform: req.headers.platform,
					id: user.payload.id
				},
				data: {
					access_token: ""
				}
			}
			const delete_access_token = await super.updateByCustomWhere(req, 'users', options);
			// req.params.id = access_token.dataValues.id;
			// const deleteFcm = await super.updateById(req, 'users');
			if (delete_access_token) {
				requestHandler.sendSuccess(res, 'User Logged Out Successfully')();
			} else {
				requestHandler.throwError(400, 'bad request', 'User Already logged out Successfully')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}
}
module.exports = AuthController;
