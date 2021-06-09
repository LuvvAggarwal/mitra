require('dotenv').config({path: __dirname + '/.env'});	
console.log(require('dotenv').config())
console.log('app >>>> ' + process.env.APP_NAME);
// config.js
module.exports = {
	app: {
		port: process.env.DEV_APP_PORT || 3000,
		appName: process.env.APP_NAME || 'mitra',
		env: process.env.NODE_ENV || 'development',
	},
	db: {
		port: process.env.DB_PORT || 5432,
		database: process.env.DB_NAME || 'mitra',
		password: process.env.DB_PASS || 'jaishreesitaram',
		username: process.env.DB_USER || 'mitra_admin',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'postgres',
		logging: true,
		url: process.env.DATABASE_URL
	},
	winiston: {
		logpath: '/mitra/logs/',
	},
	auth: {
		jwt_secret: process.env.JWT_SECRET,
		jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
		saltRounds: process.env.SALT_ROUND || 10,
		// refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'VmVyeVBvd2VyZnVsbFNlY3JldA==',
		// refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d', // 2 days
	},
	// sendgrid: {
	// 	api_key: process.env.SEND_GRID_API_KEY,
	// 	api_user: process.env.USERNAME,
	// 	from_email: process.env.FROM_EMAIL || 'luvvaggarwal2002@gmail.com',
	// },

};
