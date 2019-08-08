var db = require('mysql');
const SERVER_IP_ADDR =""; // Blank
const DATABASE='';
const MYSQL_USER = "";
const MYSQL_PASSWORD = "";
const SERVER_PORT = "";

var dbConnection  = db.createConnection({
    host : SERVER_IP_ADDR,
    user : MYSQL_USER,
    password : MYSQL_PASSWORD,
    port : SERVER_PORT,
    database : DATABASE
});
dbConnection.connect();
console.log("Success Generate DB Instance & Connect GCP");

module.exports.dbConnection = dbConnection;