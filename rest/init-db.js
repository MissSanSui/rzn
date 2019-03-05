//require('babel-core/register')({
//    presets: ['stage-3']
//});

const model = require('./model.js');
model.sync();

console.log('init db ok.');
//process.exit(0);

//node init-db.js
