var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB,
	port: process.env.MYSQL_PORT
});

exports.createDemo = function(data, cb) {
	pool.getConnection(function(err, connection) {
		connection.query(`INSERT INTO demos VALUES (null, )`)
	})
}