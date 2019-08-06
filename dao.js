var db = require('mysql');
const SERVER_IP_ADDR ="127.0.0.1";
const DATABASE='DATABASE NAME';
const MYSQL_USER = "root";
const MYSQL_PASSWORD = "PASSWORD";
const SERVER_PORT = "3306";

var dbConnection  = db.createConnection({
    host : SERVER_IP_ADDR,
    user : MYSQL_USER,
    password : MYSQL_PASSWORD,
    port : SERVER_PORT,
    database : DATABASE
});

dbConnection.connect();

module.exports.dbConnection = dbConnection;