const db = require('../db');

module.exports = db.defineModel('users', {
    // 登录名
    account: {
        type: db.STRING(100),
        unique: true
    },
    // 密码
    passwd: db.STRING(100),
    // 昵称
    name: db.STRING(100),
    // 0:男性;1:女性;2:其他
    gender: db.BOOLEAN,
    // STU:学生;TEA:教师;SYS:系统管理员;LEA:负责人
    role: db.STRING(100),
    // 关注
    focus: db.STRING(100),
    // 联系方式
    telephone: db.STRING(100),
    // 省份
    province: db.STRING(100),
    // 城市
    city: db.STRING(100),
    // 地址
    address: db.STRING(100),
    // 兴趣爱好
    interests: db.STRING(100),
    // 擅长
    good: db.STRING(100)
});
