var pool = require('./mysql_login');

var CheckID = {};



CheckID.CheckStudent = function(id, callback) {
    console.log('CheckStudent 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select id from students where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            console.log(rows);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('중복 아이디 찾음.');
                callback(null, rows);
            } else {
                console.log('중복 아이디 찾지 못함.');
                callback(null, null);
            }
        });
    });
};


CheckID.CheckMaker = function(id, callback) {
    console.log('CheckMaker 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select id from makers where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            console.log(rows);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('중복 아이디 찾음.');
                callback(null, rows);
            } else {
                console.log('중복 아이디 찾지 못함.');
                callback(null, null);
            }
        });
    });
};


CheckID.CheckManager = function(id, callback) {
    console.log('CheckManager 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select id from managers where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            console.log(rows);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('중복 아이디 찾음.');
                callback(null, rows);
            } else {
                console.log('중복 아이디 찾지 못함.');
                callback(null, null);
            }
        });
    });
};


module.exports = CheckID;