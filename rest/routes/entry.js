let express = require('express');
let router = express.Router();
const model = require('../model');

let
    User = model.User;

//(async () => {
//  var user = await User.update({
//  passwd:'gggggg'
//},{
//  where: {
//    id: {
//      $eq: 'ffc8df94-72f1-4792-862e-dcba70750af6'
//    }
//  }
//}).then(function(result){
//  console.log('updated user');
//  console.log(result);
//});

//console.log('created: ' + JSON.stringify(user));
//var cat = await Pet.create({
//  ownerId: user.id,
//  name: 'Garfield',
//  gender: false,
//  birth: '2007-07-07',
//});
//console.log('created: ' + JSON.stringify(cat));
//var dog = await Pet.create({
//  ownerId: user.id,
//  name: 'Odie',
//  gender: false,
//  birth: '2008-08-08',
//});
//console.log('created: ' + JSON.stringify(dog));
//})();

//登录
router.post('/login',function(req, res) {
  const { password, userName, type } = req.body;
  res.cookie('userName', userName);
    res.send({
      status: 'ok',
      type,
      currentAuthority: 'admin',
    });

});

module.exports = router;
