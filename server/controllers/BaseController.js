const _ = require('lodash');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const { PrismaClient, Prisma } = require('@prisma/client');
const config = require('../config/appconfig');
const url = config.db.url;
// console.log(url);
console.log(url);
const prisma = new PrismaClient({
	datasources: { db: {url}},
  })

const logger = new Logger();
const errHandler = new RequestHandler(logger);
class BaseController {
	constructor(options) {
		this.limit = 20;
		this.options = options;
	}

	/**
	* Get an element by it's id .
	*
	*
	* @return a Promise
	* @return an err if an error occur
	co*/
	//    Sequelize ki jagah prisma

	static async getById(req, modelName) {
		const reqParam = req.params.id;
		let result;
		try {
			result = await prisma[modelName].findUnique({
				where: {
					id: reqParam,
				}
			}).then(
				errHandler.throwIf(r => !r, 404, 'not found', 'Resource not found'),
				errHandler.throwError(500, 'sequelize error ,some thing wrong with either the data base connection or schema'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async getByCustomOptions(req, modelName, options) {
		let result;
		try {
			result = await prisma[modelName].findMany({
				where: options
			});
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async deleteById(req, modelName) {
		const reqParam = req.params.id;
		let result;
		try {
			result = await prisma[modelName].delete({
				where: {
					id: reqParam,
				},
			}).then(
				errHandler.throwIf(r => r < 1, 404, 'not found', 'No record matches the Id provided'),
				errHandler.throwError(500, 'sequelize error'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async create(req, modelName, data) {
		let obj = data;
		if (_.isUndefined(obj)) {
			obj = req.body;
		}
		let result;
		try {
			result = await prisma[modelName].create({ data: obj }).then(
				errHandler.throwIf(r => !r, 500, 'Internal server error', 'something went wrong couldnt save data'),
				errHandler.throwError(500, 'sequelize error'),

			).then(
				savedResource => Promise.resolve(savedResource),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}


	static async updateById(req, modelName, data) {
		const recordID = req.params.id;
		console.log(recordID);
		let result;

		try {
			result = await prisma[modelName].update({
				where: {
					id: recordID,
				},
				data: data
			}).then(
				errHandler.throwIf(r => !r, 500, 'Internal server error', 'something went wrong couldnt update data'),
				errHandler.throwError(500, 'sequelize error'),

			).then(
				updatedRecored => Promise.resolve(updatedRecored),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async updateByCustomWhere(req, modelName, options) {
		let result;

		try {
			result = await prisma[modelName].update(options).then(
				errHandler.throwIf(r => !r, 500, 'Internal server error', 'something went wrong couldnt update data'),
				errHandler.throwError(500, 'sequelize error'),

			).then(
				updatedRecored => Promise.resolve(updatedRecored),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async getList(req, modelName, options) {
		const page = req.query.page;
		// const  = req.query.number;
		let results;
		// {take: ___,where: ___} from options
		try {
			/*	if (_.isUndefined(options)) {
					options = {};
				}
	
				if (parseInt(page, 10)) {
					if (page === 0) {
						options = _.extend({}, options, {});
					} else {
						options = _.extend({}, options, {
							// skip : this.limit * (page - 1),
							limit: this.limit || 10,
						});
					}
				} else {
					options = _.extend({}, options, {}); // extend it so we can't mutate
				}
	*/
			results = await prisma[modelName]
				.findMany(options)
				.then(
					errHandler.throwIf(r => !r, 500, 'Internal server error', 'something went wrong while fetching data'),
					errHandler.throwError(500, 'sequelize error'),
				).then(result => Promise.resolve(result));
		} catch (err) {
			return Promise.reject(err);
		}
		return results;
	}
}
module.exports = BaseController;
