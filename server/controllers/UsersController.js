const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const auth = require('../utils/auth');
const json = require('../utils/jsonUtil');
const { getRelation } = require('./FollowerFollowingController');
// const { query } = require('winston');
const takeConfig = require("../config/takeConfig");
const take = takeConfig.users
const data_type = require("../config/validations/dataTypes")
const { user_children } = require("../config/softDeleteCascade")
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
				id: data_type.id,
			};
			const { error } = Joi.validate({ id: reqParam }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			const options = {
				where: {
					id: reqParam,
				},
				include: {
					problem: {
						select: {
							name: true,
							description: true
						}
					}
				}
			};
			const result = await super.getByCustomOptions(req, 'users', options);
			const payload = _.omit(result, ['access_token', 'password', 'theme', 'visibility', 'notification',])
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
	static async deleteUserById(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const schema = {
				id: data_type.id
			}
			const { error } = Joi.validate({ id: req.params.id }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = { id: req.params.id, active: true }
			const user = await super.getById(req, "users", options)
			if (_.isUndefined(user))
				return requestHandler.sendError(res, 'User not found')();
			if (req.params.id === user.id) {
				const children_data = user_children()
				// console.log(children_data);
				const result = await super.deleteByIdCascade(req, 'users', children_data);
				const payload = _.omit(result, ['access_token', 'password', 'theme', 'visibility', 'notification', 'created_on', 'updated_on'])
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

	// GET PROFILE
	static async getProfile(req, res) {
		// console.log(req);
		try {
			// console.log('getting profile');
			// const tokenFromHeader = auth.getJwtToken(req);
			const current_user = req.decoded.payload.id;
			const user_id = !req.params.user_id ? req.decoded.payload.user_id : req.params.user_id;
			// console.log(user_id);
			const schema = {
				user_id: data_type.str_100_req,
			};
			const { error } = Joi.validate({ user_id }, schema);
			// console.log(error);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			let options = {
				where: {
					user_id: user_id,
					active: true,
					// type: 'USER'
				},
				include: {
					cities: {
						include: {
							// name: true,
							states: {
								include: {
									// name: true,
									countries: {
										select: {
											id: true,
											name: true
										}
									}
								}
							}
						}
					},
					problem: {
						select: {
							id: true,
							name: true,
							description: true,
						}
					},
					help: {
						select: {
							id: true,
							name: true,
							description: true,
						}
					},
					following: {
						where: {
							follower: current_user
						}
					},
					posts: {
						take: 5,
						where: {
							active: true,
							visibility: "PUBLIC",
							group_id: null
						},
						include: {
							atachments: true,
							users: {
								select: {
									name: true,
									profile_photo: true
								}
							},
							likes: {
								where: {
									user_id: current_user
								}
							},
							_count: {
								select: {
									comments: true,
									likes: true,
									shares: true,
								},
							},
						}
					}
				}
			};

			let payload;
			const profile = await super.getByCustomOptions(req, 'users', options);
			if (!profile) {
				requestHandler.throwError(400, "bad request", "User not found")();
			}
			if (current_user !== profile.id && current_user !== profile.user_id) {
				// console.log(profile.id);
				const relation = await getRelation(req, res, profile.id);
				if (relation == 'No-Friend') {
					// HUME ABHI ZAROORAT H ISKI
					if (profile.type === "COUNSALER") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "registration_code", "last_login", "access_token", "password", "notification", "theme", "visibility",])
					}
					if (profile.type === "NGO") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "last_login", "access_token", "password", "notification", "theme", "visibility", "gender"])
					}
					if (profile.type === "USER") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "registration_code", "last_login", "access_token", "password", "notification", "theme", "visibility"])
					}
				}
				if (relation == 'Follower' || 'Following') {
					// HUME ABHI ZAROORAT H ISKI
					if (profile.type === "COUNSALER") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "registration_code", "last_login", "access_token", "password", "notification", "theme", "visibility"])
					}
					if (profile.type === "NGO") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "last_login", "access_token", "password", "notification", "theme", "visibility", "gender"])
					}
					if (profile.type === "USER") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "registration_code", "last_login", "access_token", "password", "notification", "theme", "visibility",])
					}
				}
				if (relation == "Friend") {
					// HUME ABHI ZAROORAT H ISKI
					if (profile.type === "COUNSALER") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "registration_code", "last_login", "access_token", "password",])
					}
					if (profile.type === "NGO") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "last_login", "access_token", "password", "gender"])
					}
					if (profile.type === "USER") {
						payload = _.omit(profile, ["created_on", "updated_on", "deleted_on", "deleted", "registration_code", "last_login", "access_token", "password"])
					}
				}
			}
			else {
				payload = _.omit(profile, ['created_on', 'updated_on', "deleted_on", "deleted", 'last_login', 'password', 'access_token']);
			}
			// const newOptions = { ...options, ...additionalOptions }

			// console.log(payload);
			return requestHandler.sendSuccess(res, 'Profile fetched Successfully', 200)({ payload });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}



	// TYPE === USER
	/*********************************************
* Param - req - id: req.params.id,
* Use - GET USER's PROFILE
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

	// DOING ID BASED ONLY ELSE IT WOULD BE DIFFICULT WITH USER_ID
	static async getUserProfile(req, res) {
		// console.log(req);
		try {
			// console.log('getting profile');
			// const tokenFromHeader = auth.getJwtToken(req);
			const current_user = req.decoded.payload.id;
			const id = req.params.id;
			const schema = {
				id: data_type.id,
			};
			const { error } = Joi.validate({ id: id }, schema);
			// console.log(error);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			let options = {
				where: {
					id: id,
					active: true,
					type: 'USER'
				}
			};

			let additionalOptions = {
				include: {
					cities: {
						select: {
							name: true,
							states: {
								select: {
									name: true,
									countries: {
										select: {
											name: true
										}
									}
								}
							}
						}
					},
					problem: true,
					// _count: {
					// 	select: {
					// 		following: true,
					// 		follower: true,
					// 		groups: true,
					// 		posts: true
					// 	}
					// },
				}
			}
			if (current_user !== id) {
				const relation = await getRelation(req, res, id);
				if (relation == 'No-Friend') {
					additionalOptions = {
						select: {
							id: true,
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							cities: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
						}
					}
				}
				if (relation == 'Follower' || 'Following') {
					additionalOptions = {

						select: {
							id: true,
							user_id: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							cities: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
							// _count: {
							// 	select: {
							// 		following: true,
							// 		followers: true,
							// 		groups: true,
							// 		posts: true
							// 	}
							// },
						}
					}
				}
				if (relation == "Friend") {
					additionalOptions = {

						select: {
							id: true,
							user_id: true,
							email: true,
							ph_number: true,
							name: true,
							gender: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							cities: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
							// _count: {
							// 	select: {
							// 		following: true,
							// 		followers: true,
							// 		groups: true,
							// 		posts: true
							// 	}
							// },
						}
					}
				}
			}
			const newOptions = { ...options, ...additionalOptions }

			const userProfile = await super.getByCustomOptions(req, 'users', newOptions);
			// console.log(userProfile);
			if (!userProfile) {
				requestHandler.throwError(400, "bad request", "User not found")();
			}
			// const count = await super.raw()
			// const userProfileParsed = userProfile
			const payload = _.omit(userProfile, ['created_on', 'updated_on', 'number', 'last_login', 'password', 'access_token']);
			// console.log(payload);
			return requestHandler.sendSuccess(res, 'User Profile fetched Successfully', 200)({ payload });
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

	static async getNgoProfile(req, res) {
		// console.log(req);
		try {
			// console.log('getting profile');
			// const tokenFromHeader = auth.getJwtToken(req);
			const current_user = req.decoded.payload.id;
			const id = req.params.id;
			// console.log(user.payload.id);
			const schema = {
				id: data_type.id
			}
			const { error } = Joi.validate({ id }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			let options = {
				where: {
					id: id,
					active: true,
					type: 'NGO'
				}
			};
			const additionalOptions = {
				include: {
					cities: {
						select: {
							name: true,
							states: {
								select: {
									name: true,
									countries: {
										select: {
											name: true
										}
									}
								}
							}
						}
					},
					problem: true,
					// _count: {
					// 	select: {
					// 		following: true,
					// 		follower: true,
					// 		groups: true,
					// 		posts: true
					// 	}
					// },
				}
			}
			if (current_user !== id) {
				const relation = await getRelation(req, res, id);
				if (relation == 'No-Friend') {
					additionalOptions = {
						select: {
							id: true,
							user_id: true,
							name: true,
							registration_code: true,
							email: true,
							ph_number: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							user_city: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
							help: true
						}
					}
				}
				if (relation == 'Follower' || 'Following') {
					additionalOptions = {

						select: {
							id: true,
							user_id: true,
							registration_code: true,
							email: true,
							ph_number: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							user_city: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
							help: true,
							// _count: {
							// 	select: {
							// 		following: true,
							// 		followers: true,
							// 		groups: true,
							// 		posts: true
							// 	}
							// },
						}
					}
				}
				if (relation == "Friend") {
					additionalOptions = {
						select: {
							id: true,
							user_id: true,
							email: true,
							ph_number: true,
							name: true,
							registration_code: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							user_city: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
							help: true,
							// _count: {
							// 	select: {
							// 		following: true,
							// 		followers: true,
							// 		groups: true,
							// 		posts: true
							// 	}
							// },
						}
					}
				}
			}
			const newOptions = { ...options, ...additionalOptions }

			const userProfile = await super.getByCustomOptions(req, 'users', newOptions);
			// console.log(userProfile);
			if (!userProfile) {
				requestHandler.throwError(400, "bad request", "User not found")();
			}
			// const userProfileParsed = userProfile
			const payload = _.omit(userProfile, ['created_on', 'updated_on', 'number', 'last_login', 'password', 'access_token']);
			return requestHandler.sendSuccess(res, 'NGO Profile fetched Successfully')({ payload });
		} catch (err) {
			// console.log('error');
			return requestHandler.sendError(req, res, err);
		}
	}

	static async getCounsalerProfile(req, res) {
		// console.log(req);
		try {
			// console.log('getting profile');
			// const tokenFromHeader = auth.getJwtToken(req);
			const current_user = req.decoded.payload.id;
			const id = req.params.id;
			// console.log(user.payload.id);
			const schema = {
				id: data_type.id
			}
			const { error } = Joi.validate({ id }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			let options = {
				where: {
					id: id,
					active: true,
					type: 'COUNSALER'
				}
			};
			const additionalOptions = {
				include: {
					cities: {
						select: {
							name: true,
							states: {
								select: {
									name: true,
									countries: {
										select: {
											name: true
										}
									}
								}
							}
						}
					},
					problem: true,
					// _count: {
					// 	select: {
					// 		following: true,
					// 		follower: true,
					// 		groups: true,
					// 		posts: true
					// 	}
					// }
				}
			}
			if (current_user !== user) {
				const relation = await getRelation(req, res, id);
				if (relation == 'No-Friend') {
					additionalOptions = {
						select: {
							id: true,
							user_id: true,
							name: true,
							occupation: true,
							experience: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							user_city: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
							help: true,
							// _count: {
							// 	select: {
							// 		following: true,
							// 		followers: true,
							// 		groups: true,
							// 		posts: true
							// 	}
							// },
						}
					}
				}
				if (relation == 'Follower' || 'Following') {
					additionalOptions = {

						select: {
							id: true,
							user_id: true,
							occupation: true,
							experience: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							user_city: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
							help: true,
							// _count: {
							// 	select: {
							// 		following: true,
							// 		followers: true,
							// 		groups: true,
							// 		posts: true
							// 	}
							// },
						}
					}
				}
				if (relation == "Friend") {
					additionalOptions = {
						select: {
							id: true,
							user_id: true,
							email: true,
							occupation: true,
							experience: true,
							name: true,
							profile_photo: true,
							cover_photo: true,
							bio: true,
							user_city: {
								select: {
									name: true,
									states: {
										select: {
											name: true,
											countries: {
												select: {
													name: true
												}
											}
										}
									}
								}
							},
							problem: true,
							help: true,
							// _count: {
							// 	select: {
							// 		following: true,
							// 		followers: true,
							// 		groups: true,
							// 		posts: true
							// 	}
							// },
						}
					}
				}
			}
			const newOptions = { ...options, ...additionalOptions }

			const userProfile = await super.getByCustomOptions(req, 'users', newOptions);
			// console.log(userProfile);
			if (!userProfile) {
				requestHandler.throwError(400, "bad request", "User not found")();
			}
			// const userProfileParsed = userProfile
			const payload = _.omit(userProfile, ['created_on', 'updated_on', 'number', 'last_login', 'password', 'access_token']);
			return requestHandler.sendSuccess(res, 'Counsaler Profile fetched Successfully')({ payload });
		} catch (err) {
			// console.log('error');
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
			const user = req.decoded.payload;
			// const type = req.body.type ;
			// console.log(req.files);
			const schema = {
				user: {
					// first_name: data_type.str_100_req,
					// last_name: data_type.str_100_req,
					// middle_name: data_type.str_100,
					name: data_type.str_250_req,
					address: data_type.str_200,
					city: data_type.id_opt,
					ph_number: data_type.ph_number,
					profile_photo: data_type.img_url,
					cover_photo: data_type.img_url,
					bio: data_type.text,
					type: data_type.type,
					// occupation: data_type.text,
					// gender: data_type.gender,
					problem_category: data_type.id,
					// visibility: data_type.visibility,
					// theme: data_type.theme,
					// notification: data_type.notification,
				},
				ngo: {
					name: data_type.str_250_req,
					ph_number: data_type.ph_number,
					profile_photo: data_type.img_url,
					cover_photo: data_type.img_url,
					address: data_type.str_200,
					city: data_type.id_opt,
					bio: data_type.text,
					problem_category: data_type.id,
					help_type: data_type.id_opt,
					type: data_type.type,
					// registration_code: data_type.str_100_req,
					// visibility: data_type.visibility,
					// theme: data_type.theme,
					// notification: data_type.notification,
				},
				counsaler: {
					// first_name: data_type.str_100_req,
					// last_name: data_type.str_100_req,
					// middle_name: data_type.str_100_req,
					name: data_type.str_250_req,
					address: data_type.str_200,
					ph_number: data_type.ph_number,
					city: data_type.id_opt,
					profile_photo: data_type.img_url,
					cover_photo: data_type.img_url,
					bio: data_type.text,
					// occupation: data_type.text,
					// experience: data_type.integer,
					// gender: data_type.gender,
					problem_category: data_type.id,
					help_type: data_type.id_opt,
					type: data_type.type,
					// visibility: data_type.visibility,
					// theme: data_type.theme,
					// notification: data_type.notification,
				}
			};

			const validate = {
				user: {
					// first_name: req.body.first_name,
					// last_name: req.body.last_name,
					// middle_name: req.body.middle_name,
					name: req.body.name,
					address: req.body.address,
					ph_number: req.body.ph_number,
					profile_photo: req.files.profile_photo[0].path,
					cover_photo: req.files.cover_photo[0].path,
					// gender: req.body.gender,
					bio: req.body.bio,
					// occupation: req.body.occupation,
					city: req.body.city,
					problem_category: req.body.problem_category,
					type: req.body.type
					// visibility: req.body.visibility,
					// theme: req.body.theme,
					// notification: req.body.notification,
				},
				ngo: {
					name: req.body.name,
					address: req.body.address,
					ph_number: req.body.ph_number,
					profile_photo: req.files.profile_photo[0].path,
					cover_photo: req.files.cover_photo[0].path,
					bio: req.body.bio,
					problem_category: req.body.problem_category,
					// occupation: req.body.occupation,
					city: req.body.city,
					// registration_code: req.body.registration_code,
					help_type: req.body.help_type,
					type: req.body.type
					// visibility: req.body.visibility,
					// theme: req.body.theme,
					// notification: req.body.notification,
				},
				counsaler: {
					// first_name: req.body.first_name,
					// last_name: req.body.last_name,
					// middle_name: req.body.middle_name,
					name: req.body.name,
					address: req.body.address,
					ph_number: req.body.ph_number,
					profile_photo: req.files.profile_photo[0].path,
					cover_photo: req.files.cover_photo[0].path,
					// gender: req.body.gender,
					bio: req.body.bio,
					// occupation: req.body.occupation,
					// experience: req.body.experience,
					problem_category: req.body.problem_category,
					city: req.body.city,
					help_type: req.body.help_type,
					type: req.body.type
					// visibility: req.body.visibility,
					// theme: req.body.theme,
					// notification: req.body.notification,
				}
			}

			// console.log("req > ");
			// console.log(req.body);
			const type = req.body.type.toLowerCase();
			const { error } = Joi.validate(validate[type], schema[type]);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = {
				id: user.id,
				active: true,
			}
			const user_data = await super.getById(req, "users", options)
			// console.log(user_data);
			if (_.isUndefined(user_data))
				return requestHandler.throwError(400, 'bad request', 'User not found')();
			// if(user === user_data.id){
			req.params.id = user.id
			const userProfile = await super.updateById(req, 'users', validate[type]);
			// const cityData = await super.getByCustomOptions(req,"cities", {
			// 	where: {
			// 		id: userProfile.city
			// 	},
			// 	include: {

			// 	}
			// })
			const payload = _.omit(userProfile, ['created_on', 'updated_on', 'last_login_date', 'password', 'access_token']);
			return requestHandler.sendSuccess(res, 'User Profile updated Successfully')({ payload });
			// }
			// else{
			// 	return requestHandler.throwError(400,"bad request","You are not authorized to update user profile")();
			// }
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}

	static async getUsers(req, res) {
		try {
			// const tokenFromHeader = auth.getJwtToken(req);
			// const user = jwt.decode(tokenFromHeader).payload.id;
			const id = req.decoded.payload.id
			const q = req.params.q; // query
			
			const schema = {
				q: data_type.text,
				// lastNumber: data_type.integer
			}
			const { error } = Joi.validate({ q: q }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');
			// console.log('GETTING');
			const urlSearchParams = new URLSearchParams(q);
			const query = Object.fromEntries(urlSearchParams.entries());
			// console.log(query);
			if(query.type != undefined && query.type.indexOf("{") == "0"){
				query.type = JSON.parse(query.type)
			}
			let where;
			if (query.keyword == "" && query.problem == "") {
				where = {
					type: query.type,
					active: true
				}
			} else if (query.keyword == "" && query.problem != "") {
				where = {
					type: query.type,
					problem_category: query.problem,
					active: true,
				}
			} else if (query.keyword != "" && query.problem == "") {
				where = {
					type: query.type,
					active: true,
					OR: [
						{
							name: {
								contains: query.keyword,
								mode: 'insensitive',
							}
						}, {
							cities: {
								OR: [
									{
										name: {
											contains: query.keyword,
											mode: 'insensitive',
										}
									},
									{
										states: {
											OR: [
												{
													name: {
														contains: query.keyword,
														mode: 'insensitive',
													}
												},
												{
													countries: {
														name: {
															contains: query.keyword,
															mode: 'insensitive',
														}
													}
												}
											]
										}
									}
								]
							}
						}
					]

				}
			} else {
				where = {
					type: query.type,
					active: true,
					OR: [
						{
							name: {
								contains: query.keyword,
								mode: 'insensitive',
							}
						}, {
							cities: {
								OR: [
									{
										name: {
											contains: query.keyword,
											mode: 'insensitive',
										}
									},
									{
										states: {
											OR: [
												{
													name: {
														contains: query.keyword,
														mode: 'insensitive',
													}
												},
												{
													countries: {
														name: {
															contains: query.keyword,
															mode: 'insensitive',
														}
													}
												}
											]
										}
									}
								]
							}
						}
					],
					problem_category: query.problem,
					active: true
				}
			}


			//WE COULD DIRECTLY SEARCH ON GROUP MEMBER MAP BUT FINE AS OF NOW
			const lastNumber = parseInt(query.lastNumber.replace("n",""),10)
			if (lastNumber > -1)
				where.number = { lt: lastNumber };
			const limit = query.take ? parseInt(query.take, 10): take;
			const options = {
				take: limit,
				where: where,
				orderBy: {
					number: "desc"
				},
				include: {
					following: {
						where: {
							follower : id,
							active: true
						}
					},
				}
				// select: {
				// 	groups: {
				// 		select: {
				// 			id: true,
				// 			group_id: true,
				// 			name: true,
				// 			profile_photo: true,
				// 			cover_photo: true,
				// 		}
				// 	}
				// }
			}
			// console.log(options);
			const users = await super.getList(req, 'users', options);
			// const omit = _.omitBy(user, ['created_on', 'updated_on', 'last_login_date', 'password', 'access_token']);
			// console.log("omit");
			// console.log(omit);
			const payload = _.map(users,(row)=>{
				return _.omit(row,['created_on', 'updated_on', 'last_login_date', 'password', 'access_token'])
			})
			// console.log(payload);
			return requestHandler.sendSuccess(res, "Users Fetched Successfully")({ payload });
		} catch (err) {
			// console.log(err);
			return requestHandler.sendError(req, res, err);
		}
	}

}

module.exports = usersController;
