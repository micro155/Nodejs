var mysql = require('../node_modules/mysql');


var pool = mysql.createPool({
    connecitonLimit: 10,
    host:'192.168.0.25',
    user:'3FTwUl1LwiN2hjLf',
    password:'oRTNdxTC8mNnlYCI',
    database:'cf_3ce6beb2_0c9f_49f1_b4d9_40953b541c6d',
    debug:false
});


module.exports = pool;