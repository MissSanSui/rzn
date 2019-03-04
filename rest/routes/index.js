var express = require('express');
var router = express.Router();
//加载mysql模块

//引入数据库包
var mysql = require("../middleware/db-mysql-connect.js");



//写接口
router.get('/query', function(req, res, next) {
  var sql="select * from user"  //写sql语句
  mysql.query(sql, function(err, rows) {   //从数据库查询
    console.log(rows)
    if(err) {
      var data = {
        code: -1,
        data: null,
        isSuccess: false,
        msg: err
      }
    } else {
      var data = {
        code: 0,
        data: rows,
        isSuccess: true,
        msg: "请求成功"
      }
    }
    res.json(data)  //返回查询结果
  })
});


router.get('/', function(req, res, next) {
  var sql="select * from user"  //写sql语句
  mysql.query(sql, function(err, rows) {   //从数据库查询
    console.log(rows)
    if(err) {
      var data = {
        code: -1,
        data: null,
        isSuccess: false,
        msg: err
      }
    } else {
      var data = {
        code: 0,
        data: rows,
        isSuccess: true,
        msg: "请求成功"
      }
    }
    res.json(data)  //返回查询结果
  })
});

module.exports = router;