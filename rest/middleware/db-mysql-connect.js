var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'rm-2zey79nn2g4vtt9b9co.mysql.rds.aliyuncs.com',
  port: '3306',
  user     : 'root',
  password : 'Gaohe@123',
  database : 'mysql'
});

function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    // Use the connection
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      connection.release();//释放链接
    });
  });
}
exports.query = query;