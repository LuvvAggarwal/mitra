const _ = require('lodash');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const { PrismaClient, Prisma } = require('@prisma/client');
const {db} = require('../config/appconfig');
const url = db.url;
const WorkerCon = require('../Worker/WorkerPoolController')
// const {Worker, isMainThread  } = require('worker_threads');
// console.log(url);
const json = require('../utils/jsonUtil')
const prisma = new PrismaClient({
	log: [
		{ level: 'warn', emit: 'event' },
		{ level: 'info', emit: 'event' },
		{ level: 'error', emit: 'event' },
	],
	datasources: { db: { url } },
})

const logger = new Logger();
const errHandler = new RequestHandler(logger);
prisma.$on('warn', e => {
	console.log(e)
})

prisma.$on('info', e => {
	console.log(e)
})

prisma.$on('error', e => {
	console.log(e)
})

class BaseController {
	// constructor() {
	// 	// this.take = take;
	// }

	/**
	* Get an element by it's id .
	*
	*
	* @return a Promise
	* @return an err if an error occur
	co*/
	//    Sequelize ki jagah prisma
	// {
	// 	where: {
	// 		id: reqParam,
	// 	},
	// 	include: include
	// }
	// REQ VAR MAY REMOVE
	static async getById(req, modelName, options) {
		const reqParam = req.params.id;
		// options.take = 1
		// options.where.active = true;
		console.log(options);
		let result;
		try {
			result = await prisma[modelName].findMany({ where: options }).then(
				errHandler.throwIf(r => !r, 404, 'not found', 'Resource not found'),
				errHandler.throwError(500, 'server error, some thing wrong with either the data base connection or schema'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result)[0];
	}

	static async getByCustomOptions(req, modelName, options) {
		options.take = 1;
		let result;
		try {
			result = await prisma[modelName].findMany(options).then(
				errHandler.throwIf(r => !r, 404, 'not found', 'Resource not found'),
				errHandler.throwError(500, 'server error ,some thing wrong with either the data base connection or schema'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result)[0];
	}

	static async deleteById(req, modelName) {
		const reqParam = req.params.id
		let result;
		try {
			result = await prisma[modelName].update({
				where: {
					id: reqParam,
				},
				data: {
					active: false,
					deleted: true,
					deleted_on: new Date().toISOString()
				}
			}).then(
				errHandler.throwIf(r => r < 1, 404, 'not found', 'No record matches the Id provided'),
				errHandler.throwError(500, 'server error'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);
	}

	static async deleteByIdCascade(req, modelName,children) {
		const reqParam = req.params.id
		let result;
		try {
			result = await prisma[modelName].update({
				where: {
					id: reqParam,
				},
				data: {
					active: false,
					deleted: true,
					deleted_on: new Date().toISOString()
				}
			}).then(
				(async ()=>{
					const workerPool = WorkerCon.get()
					result = await workerPool.deleteChilds(reqParam,children) ;			
					// console.log(JSON.stringify(workerPool.stats())); 	
				})(),
				errHandler.throwIf(r => r < 1, 404, 'not found', 'No record matches the Id provided'),
				errHandler.throwError(500, 'server error'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);
	}

	static async deleteByIdPermanent(req, modelName) {
		const reqParam = req.params.id;
		let result;
		try {
			result = await prisma[modelName].delete({
				where: {
					id: reqParam,
				}
			}).then(
				errHandler.throwIf(r => r < 1, 404, 'not found', 'No record matches the Id provided'),
				errHandler.throwError(500, 'sequelize error'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);
	}

	static async deleteByOptions(options, modelName) {
		let result;
		try {
			result = await prisma[modelName].update({
				where: options,
				data: {
					active: false,
					deleted: true,
					deleted_on: new Date().toISOString()
				}
			}).then(
				console.log("then"),
				errHandler.throwIf(r => r < 1, 404, 'not found', 'No record matches the Id provided'),
				errHandler.throwError(500, 'server error'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);
	}

	static async deleteByOptionsPermanent(options, modelName) {
		let result;
		try {
			result = await prisma[modelName].delete({
				where: options
			}).then(
				errHandler.throwIf(r => r < 1, 404, 'not found', 'No record matches the Id provided'),
				errHandler.throwError(500, 'sequelize error'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);
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
		return json.parse(result);
	}

	static async createMany(req, modelName, data) {
		let obj = data;
		if (_.isUndefined(obj)) {
			obj = req.body;
		}
		let result;
		try {
			result = await prisma[modelName].createMany({ data: obj }).then(
				errHandler.throwIf(r => !r, 500, 'Internal server error', 'something went wrong couldnt save data'),
				errHandler.throwError(500, 'prisma error'),

			).then(
				savedResource => Promise.resolve(savedResource),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);
	}


	static async updateById(req, modelName, data) {
		const recordID = req.params.id;
		console.log(recordID);
		let result;
		data.updated_on = new Date().toISOString();
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
		return json.parse(result);
	}

	static async updateMany(req, modelName, data) {
		//
		let result
		try {
			result = await prisma[modelName].updateMany(data).then(
				errHandler.throwIf(r => !r, 500, 'Internal server error', 'something went wrong couldnt update data'),
				errHandler.throwError(500, 'sequelize error'),

			).then(
				updatedRecored => Promise.resolve(updatedRecored),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);
	}

	static async updateByCustomWhere(req, modelName, options) {
		let result;
		data.updated_on = new Date().toISOString();
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
		return json.parse(result);
	}

	static async upsert(req, modelName, create, update,query) {
		// const reqParam = req.params.id;
		// const {id,...updateOptions} = options ;
		let result;
		try {
			result = await prisma[modelName].upsert({
				create: create,
				update: update,
				where: query
			}).then(
				errHandler.throwIf(r => !r, 500, 'Internal server error', 'something went wrong couldnt update data'),
				errHandler.throwError(500, 'sequelize error'),

			).then(
				updatedRecored => Promise.resolve(updatedRecored),
			);
			if (result.id === reqParam) {
				result.operation = "update";
			  } else {
				result.operation = "create";
			  }
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);

	}

	static async getList(req, modelName, options) {
		// const page = req.query.page;
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
		return json.parse(results);
	}

	//AGGREGATE

	static async aggregate(req, modelName, options) {
		// options.take = 1;
		let result;
		try {
			result = await prisma[modelName].aggregate(options).then(
				errHandler.throwIf(r => !r, 404, 'not found', 'Resource not found'),
				errHandler.throwError(500, 'server error ,some thing wrong with either the data base connection or schema'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result)[0];
	}

	static async groupBy(req, modelName, options) {
		// options.take = 1;
		let result;
		try {
			result = await prisma[modelName].groupBy(options).then(
				errHandler.throwIf(r => !r, 404, 'not found', 'Resource not found'),
				errHandler.throwError(500, 'server error ,some thing wrong with either the data base connection or schema'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result)[0];
	}

	static async count(req, modelName, options) {
		// options.take = 1;
		let result;
		try {
			result = await prisma[modelName].count(options).then(
				errHandler.throwIf(r => {typeof r != "number" }, 404, 'not found', 'Problem in counting' ),
				errHandler.throwError(500, 'server error ,some thing wrong with either the data base connection or schema'),
			).then(count => {Promise.resolve(count) ;console.log(count);},console.log('resolve'));
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async raw(query) {
		// options.take = 1;
		let result;
		try {
			result = await prisma.$queryRaw(query).then(
				errHandler.throwIf(r => !r, 404, 'not found', 'Resource not found'),
				errHandler.throwError(500, 'server error ,some thing wrong with either the data base connection or schema'),
			);
		} catch (err) {
			return Promise.reject(err);
		}
		return json.parse(result);
	}
	
}
module.exports = BaseController;
