import axios from "axios" ;
const app_config = require("../config/app_config")
export default axios.create({
    baseURL:  app_config.backend.host + "/api/v1/booking"
})