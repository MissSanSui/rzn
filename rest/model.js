// scan all models defined in models:
const fs = require('fs');
const db = require('./config/db');

let files = fs.readdirSync(__dirname + '/api/model');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/api/model/' + f);
}

module.exports.sync = () => {
    db.sync();
};
