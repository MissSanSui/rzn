const db = require('../../config/db');

module.exports = db.defineModel('User', {
    // 登录名
    account: {
        type: db.STRING(100),
        unique: true
    },
    // 密码
    password: db.STRING(100),
    // 昵称
    name: db.STRING(100),
    // STU:学生;TEA:教师;PAR:家长;SYS:系统管理员;LEA:负责人
    role: db.STRING(100),
    // 报名老师{数组}
    teachers: {
        type: db.STRING(100),
        allowNull: true
    },
});
