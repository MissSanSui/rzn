const db = require('../db');

module.exports = db.defineModel('students', {
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),

    // 0:男性;1:女性;2:其他
    gender: db.BOOLEAN
});
