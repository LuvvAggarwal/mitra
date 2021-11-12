/*
लोकाभिरामं रणरंगधीरं राजीवनेत्रं रघुवंशनाथं ।
कारुण्यरूपं करुणाकरं तं श्रीरामचन्द्रं शरणं प्रपद्ये ॥32॥

मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम ।
वातात्मजं वानरयूथमुख्यं श्रीराम दूतं शरणं प्रपद्ये ॥33॥

|| श्री सीतारामचंद्र प्रीतिअर्थे समर्पणं अस्तु ||
|| श्री सीतारामचंद्र अर्पणम अस्तु ||
*/

// JAI SHREE SITARAM
const express = require('express');
// const bodyParser = require('body-parser');

const cors = require('cors');
const compression = require('compression');
const uuid = require('uuid');
const config = require('../config/appconfig');
const Logger = require('../utils/logger.js');
const cookieParser = require('cookie-parser');


const app_config = require("../config/appconfig");
const WorkerCon = require("../Worker/WorkerPoolController")
const logger = new Logger();
const app = express();
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: [app_config.app.front]
	}
});
const {getList} = require("../controllers/BaseController")
app.set('config', config); // the system configrationsx

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(require('method-override')());

// app.use(compression());
app.use(cors());
const swagger = require('../utils/swagger');
const { worker } = require('../config/appconfig');
app.use(cookieParser());

process.on('SIGINT', () => {
	logger.log('stopping the server', 'info');
	process.exit();
});

// app.set('db', require('../models/index.js'));
const port = config.app.port;
app.set('port', port);
app.use('/api/docs', swagger.router);

app.use((req, res, next) => {
	req.identifier = uuid();
	const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
	logger.log(logString, 'info');
	next();
});

app.use(require('../router'));

app.use((req, res, next) => {
	logger.log('the url you are trying to reach is not hosted on our server', 'error');
	const err = new Error('Not Found');
	err.status = 404;
	res.status(err.status).json({ type: 'error', message: 'the url you are trying to reach is not hosted on our server' });
	next(err);
});

io.on('connection', (socket) => {
	console.log('a user connected ' + socket.id);

	socket.on('post-created', async(id) => {
		console.log(">>>>>>> " + id);
		const opt = {
			where: {
				id: id
			},
			select: {
				id: true
			}
		}
		const followers = await getList(id, "follower_following", opt)
		let result = [];
		followers.map((e)=>{
			result.push(e.id) ;
		})
		console.log(result);
		socket.broadcast.emit("followers" ,result.toString());
	  });
  });
  

(async () => {
	// Init Worker Pool
	if (worker.enabled === '1') {
		const options = { minWorkers: 'max' }
		await WorkerCon.init(options)
	}

	// Start Server
	server.listen(port, () => {
		console.log('Server is listening on: ', port)
	})
})()


module.exports = app;
