const express = require('express');
const router = express.Router();

const UserService = require('./user/UserService');
let userService = new UserService();

//sys,admin,guest,teacher,student

//登录
router.post('/login', async (req, res, next) => {
  const { password, userName, type} = req.body;
  const data = await userService.queryUser(userName);
  if(data[0].password === password) {
    req.session.session_id = data[0].account;
    res.json({
      code: 0,
      status: 'suc',
      data: data,
      type,
      currentAuthority: 'admin',
    });
  } else {
    res.json({
      code: 1,
      status: 'err'
    });
  }

});

module.exports = router;
