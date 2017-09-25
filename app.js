var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');
var sqlQuery;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'homestead',
  password : 'secret',  
  database : 'homestead'
});
connection.connect();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

app.get('/user_id/:id', function(req, res) {
  sqlQuery = "SELECT c.id, p.user_id, c.model, BIT_OR(p.permission) AS permission FROM cars c, permissions p WHERE c.id = p.dev_id AND p.user_id = ? GROUP BY c.id, p.user_id, c.model ORDER BY c.id";
  connection.query(sqlQuery, [req.params.id], function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});
app.post('/auth', (req, res) => {
  sqlQuery = "SELECT id, login FROM users WHERE login = ? AND password = ?";
  connection.query(sqlQuery, [req.body.login, req.body.password], function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});
app.listen(3000, function () {
  console.log('Test app listening on port 3000!');
});