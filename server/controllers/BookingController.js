// JAI SIYARAM

const Joi = require('joi');
// const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const _ = require('lodash');
// const BaseController = require('./BaseController');
// const GroupMemberController = require("./GroupsMemberController");
const RequestHandler = require('../utils/RequestHandler');
const event = require("../config/events");
const data_type = require("../config/validations/dataTypes");
const take = require("../config/takeConfig");
const Logger = require('../utils/logger');
// const auth = require('../utils/auth');
// const json = require('../utils/jsonUtil');
// const { createId } = require('../utils/idUtil');
const BaseController = require('./BaseController');
const { last } = require('lodash');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
// const gm = new GroupMemberController(10);
// console.log(gm);
class notificationController extends BaseController {
	/*********************************************
	 * Param - req - post_id: req.params.id 
	 * Use - Post with full data -- INTERNAL
	 * Flow - 1 check if user is member
	 * 		  2 get post
	 */
	//YE INTERNALLY USE HONGE
	static async createBooking(req,res) {
		try {
			const user = req.decoded.payload.id;
			const schema = {
				counsoler: data_type.id,
				user: data_type.id,
				start_time: data_type.str_100_req,
				end_time: data_type.str_100_req,
				meeting_link: data_type.text_req
			}
			const data = {
				counsoler: req.body.counsoler,
				user: user,
				start_time: req.body.start_time,
				end_time: req.body.end_time,
				meeting_link: req.body.meeting_link
			}
			const { error } = Joi.validate(data, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'Please send proper data');

			data.id = uuid.v4();
			data.created_by = user;
			data.updated_by = user;
			const options = {
				where: {
					active: true,
					start_time: data.start_time,
					end_time: data.end_time,
					counsoler: data.counsoler
				}
			}
			const record = await super.getByCustomOptions(req, "booking", options);
			if (record) {
				requestHandler.throwError(400, "Bad Request", "Sorry! already booked slot");
			}
			const payload = await super.create(req, 'booking', data);
			return requestHandler.sendSuccess(res, "Booking created Successfully")({payload });
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

	static async getBookings(req,res) {
		try {
			const user = req.decoded.payload;
			const schema = {
				id: data_type.id,
				start_time: data_type.str_100_req,
				end_time: data_type.str_100_req
			}
			const data = {
				id: req.params.counsoler,
				start_time: req.params.start_time,
				end_time: req.params.end_time
			}
			const { error } = Joi.validate(data, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'Please send proper data');

			let query ;
			query = {
				where: {
					active: true,
					start_time: {
						gte: data.start_time
					},
					end_time: {
						lte: data.end_time
					},
					counsoler: data.id
				},
				include: {
					counsoler_user: true,
					user_user: true
				}
			}

			const payload = await super.getList(req, "booking", query)

		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

	static async reviewBooking(req,res) {
		try {
			const user = req.decoded.payload.id;
			const schema = {
				id: data_type.id,
				review: data_type.text_req,
				rating: data_type.integer
			}
			const data = {
				id: req.params.id,
				review: req.body.review,
				rating: req.body.rating
			}
			const { error } = Joi.validate(data, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'Please send proper data');

			data.active = false;
			data.updated_by = user;
			data.updated_on = new Date().toISOString();

			const payload = await super.updateById(req, 'booking', data);
			return requestHandler.sendSuccess(res, "Review registered Successfully")({payload });
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

	static async cancelBooking(req,res) {
		try {
			const id = req.params.id;
			const schema = {
				id: data_type.id,
			}
			const data = {
				id: id,
			}
			const { error } = Joi.validate(data, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'Please send proper data');

			const payload = await super.deleteById(req, 'booking');
			return requestHandler.sendSuccess(res, "Booking Cancelled Successfully")({payload });
		} catch (error) {
			return requestHandler.throwError(500, "Internal Server Error", error)
				(error);
		}
	}

}

module.exports = notificationController;
