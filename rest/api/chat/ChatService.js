const ChatDao = require('./ChatDao');
let chatDao = new ChatDao();

class ChatService {
  //async createStudent(student) {
  //
  //  var student = {
  //    account:'ssss',
  //    // 密码
  //    passwd: 'aaa',
  //    // 昵称
  //    name: 'gaohe',
  //    // 0:男性;1:女性;2:其他
  //    gender: '0',
  //    // STU:学生;TEA:教师;SYS:系统管理员;LEA:负责人
  //    role: 'teacher',
  //    // 关注
  //    focus: 'shuxue',
  //    // 联系方式
  //    telephone: '18210886870',
  //    // 省份
  //    province: 'hebei',
  //    // 城市
  //    city: 'baoding',
  //    // 地址
  //    address: 'boye',
  //    // 兴趣爱好
  //    interests: 'basketball',
  //    // 擅长
  //    good: 'xuexi'
  //  };
  //
  //  const data = await userDao.createStudent(student);
  //  console.log(data);
  //  return data;
  //
  //}



  async queryChat(account) {
    const data = await chatDao.queryChat(account);
    return data;
  }




}
module.exports = ChatService;