const db = require('../../config/db');

module.exports = db.defineModel('Chatroom', {
    // 教室老师登录名
    owner: {
        type: db.STRING(100),
        unique: true
    },
    // 白板id
    white_id: db.STRING(100),
    // 白板token
    room_token: db.STRING(100),
    // 视频id
    video_id: db.STRING(100),
    // 密码
    password: db.STRING(100)
});
