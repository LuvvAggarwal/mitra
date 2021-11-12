const {io} = require("socket.io-client");
const url = require("../config/app_config").backend.host ;
const socket = io(url, {
  reconnectionDelayMax: 10000,
});

export default socket ;