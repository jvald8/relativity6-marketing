var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB,
	port: process.env.MYSQL_PORT
});

exports.createDemo = function(req, res) {
	var data = req.body;

	pool.getConnection(function(err, connection) {
		connection.query(`INSERT INTO demos VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.firstname, data.lastname, data.email, data.phone, data.jobtitle, data.company, data.country, data.page],function(err, rows, fields) {
			if(err) throw err;

			console.log(rows);

			connection.release();
		})
	})

	// if successful
	res.render('demo', {message: "You're the best! We'll be in touch soon!", countries: ['US', 'Canada']});
}