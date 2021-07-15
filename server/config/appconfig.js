require('dotenv').config();	
// console.log(require('dotenv').config())
console.log('app >>>> ' + process.env.APP_NAME);
// config.js
module.exports = {
	worker: {
		enabled : process.env.WORKER_POOL_ENABLED
	},
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
	oauth2Credentials: {
		client_id: process.env.GOOGLE_0AUTH_CLIENT_ID,
		project_id: process.env.GOOGLE_0AUTH_PROJECT_ID, // The name of your project
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_secret: process.env.GOOGLE_0AUTH_CLIENT_SECRET,
		redirect_uris: [
		  `http://localhost:${process.env.DEV_APP_PORT}/`
		],
		scopes: [
		//   'https://www.googleapis.com/auth/youtube.readonly'
		]
	  }
	// sendgrid: {
	// 	api_key: process.env.SEND_GRID_API_KEY,
	// 	api_user: process.env.USERNAME,
	// 	from_email: process.env.FROM_EMAIL || 'luvvaggarwal2002@gmail.com',
	// },

};
