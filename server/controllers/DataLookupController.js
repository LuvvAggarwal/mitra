const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
// const BaseController = require('./BaseController');
// const GroupMemberController = require("./GroupsMemberController");
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const data_type = require("../config/validations/dataTypes");
// const NotificationController = require("../controllers/NotificationController");
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { createId } = require('../utils/idUtil');
const BaseController = require('./BaseController');
// const take_config = require("../config/takeConfig");
// const { isGroupMember } = require('./GroupsMemberController');
// const { createAttachmentRecord } = require('./PostsActionController');
// const nc = require('./NotificationController');
// const take = take_config.posts;

// const workerpool = require('workerpool');
// const { post_type } = require('../config/validations/dataTypes');
// const { profile } = require('winston');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
// const nc = new notificationController()
// const gm = new GroupMemberController(10);
// console.log(gm);
class dataLookupController extends BaseController {
	/*********************************************
	 * Param - req - post_id: req.params.id 
	 * Use - Post with full data -- INTERNAL
	 * Flow - 1 check if user is member
	 * 		  2 get post
	 */
	 static async getDL(req, res) {
		try {
			console.log(req.params);
			const model = req.params.model;
			// console.log(reqParam);
			const schema = {
				model: data_type.dl_model,
				// is_active: Joi.boolean().required(),
			};
			const { error } = Joi.validate({ model, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					active: true
				},
			};
			console.log("checking");

			console.log(options);
			const result = await super.getList(req, model, options);
			const payload = result
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'Model Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getCountries(req, res) {
		try {
			// console.log(req.params);
			// const reqParam = req.params.id;
			// console.log(reqParam);
			// const schema = {
			// 	id: data_type.id,
			// 	// is_active: Joi.boolean().required(),
			// };
			// const { error } = Joi.validate({ id: reqParam, /*is_active: req.body.is_active */ }, schema);
			// requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					active: true
				},
			};
			console.log("checking");

			console.log(options);
			const result = await super.getList(req, 'countries', options);
			const payload = result
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'Countries Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getStates(req, res) {
		try {
			console.log(req.params);
			const country_id = req.params.id;
			// console.log(reqParam);
			const schema = {
				id: data_type.id,
				// is_active: Joi.boolean().required(),
			};
			const { error } = Joi.validate({ id: country_id, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid Country Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					country_id,
					active: true
				},
				orderBy: {
					name: "asc"
				}
			};
			console.log("checking");

			console.log(options);
			const result = await super.getList(req, 'states', options);
			const payload = result
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'States Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getCities(req, res) {
		try {
			console.log(req.params);
			const state_id = req.params.id;
			// console.log(reqParam);
			const schema = {
				id: data_type.id,
				// is_active: Joi.boolean().required(),
			};
			const { error } = Joi.validate({ id: state_id, /*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid Country Id');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					state_id,
					active: true
				},
				orderBy: {
					name: "asc"
				}
			};
			console.log("checking");

			console.log(options);
			const result = await super.getList(req, 'cities', options);
			const payload = result
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'Cities Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getDLData(req, res) {
		try {
			const model = req.params.model;
			const name = req.params.name ;
			// console.log(reqParam);
			const schema = {
				model: data_type.dl_model,
				name: data_type.str_150_req
				// is_active: Joi.boolean().required(),
			};
			const { error } = Joi.validate({ model, name/*is_active: req.body.is_active */ }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// EFFECTIVE QUERY HANDLING
			const options = {
				where: {
					name: {statrsWith: name},
					active: true
				},
				orderBy: {
					name: "asc"
				}
			};
			console.log("checking");

			console.log(options);
			const result = await super.getList(req, model, options);
			const payload = result
			// _.omit(result, ['created_on', 'updated_on', 'active', 'updated_by', 'created_by'])
			return requestHandler.sendSuccess(res, 'Data Extracted')({ payload });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}


}

module.exports = dataLookupController;
