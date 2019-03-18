const express = require('express');
const router = express.Router();

const UserService = require('./user/UserService');
let userService = new UserService();

//添加用户
router.post('/addUser', async (req, res, next) => {
  console.log(req.body)
  const user = req.body;
  const data = await userService.createUser(user);
  console.log(data + '11');
  res.json({
    code:0,
    msg:'OK',
    data: data
  })
});

//查询用户
router.post('/queryUser', async (req, res, next) => {
  console.log(req.session.session_id);
  const data = await userService.queryUser('gaohe');
  //console.log(data[0]);
  res.json({
    code: 0,
    status: 'suc',
    data: data[0]
  })
});

//查询用户list
router.post('/queryUsers', async (req, res, next) => {
  const data = await userService.queryUsers();
  console.log(data);
  res.json({
    list: data,
    pagination:
      {
        total: 46,
        pageSize: 10,
        current: 1
      }
  })
});

module.exports = router;