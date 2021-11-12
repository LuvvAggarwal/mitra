const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config/appconfig');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const { getByCustomOptions } = require('../controllers/BaseController')
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
function getTokenFromHeader(req) {
	if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
		|| (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
		return req.headers.authorization.split(' ')[1];
	}

	return null;
}

function verifyToken(req, res, next) {
	// console.log(req);
	try {
		// console.log(req);
		console.log("starting");
		if (_.isUndefined(req.headers.authorization)) {
			requestHandler.throwError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
		}
		console.log("fuuu lll ");
		// console.log(req.headers.authorization);
		const Bearer = req.headers.authorization.split(' ')[0];

		if (!Bearer || Bearer !== 'Bearer') {
			requestHandler.throwError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
		}

		const token = req.headers.authorization.split(' ')[1];
		console.log("token");
		console.log(token);
		if (!token || token == "null") {
			requestHandler.throwError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
		}

		// verifies secret and checks exp
		jwt.verify(token, config.auth.jwt_secret, async (err, decoded) => {
			if (err) {
				console.log(err);
				requestHandler.throwError(401, 'Unauthorized', 'please provide a vaid token ,your token might be expired')();
			}
			const id = decoded.id ; 
			//finding user based on access Token
			const user = await getByCustomOptions(req, 'users', { where: { id: id, active: true } });
			console.log('user');
			if (!user) {
				const err = { status: 401, message: "user not found" }
				requestHandler.throwError(400, "bad request", "user not found")()
			} else {
				req.decoded = decoded;
				next();
			}
			console.log("pass");
		});
		// console.log('authenticated');
	} catch (err) {
		console.log('error');
		requestHandler.sendError(req, res, err);
	}
}


module.exports = { getJwtToken: getTokenFromHeader, isAuthunticated: verifyToken };
