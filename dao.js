var db = require('mysql');
const SERVER_IP_ADDR ="34.97.219.44"; // Blank
const DATABASE='javachip_database';
const MYSQL_USER = "root";
const MYSQL_PASSWORD = "dearjavachip0713";
const SERVER_PORT = "3306";

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