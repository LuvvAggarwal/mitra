// require('dotenv').config();	

module.exports = {
    backend: {
        host: process.env.NODE_ENV === "production" ? "" : "http://localhost:4000"
    }
}