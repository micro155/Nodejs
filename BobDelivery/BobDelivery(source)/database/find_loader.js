var pool = require('./mysql_login');

var findQuery = {};


findQuery.StudentLocation = function(name, callback) {
    console.log('Studentlocation 호출됨 : ' + name);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select address1, address2 from students where name = ?", [name], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('사용자 찾음.');
                callback(null, rows);
            } else {
                console.log('사용자 찾지 못함.');
                callback(null, null);
            }
        });
    });
    
};



findQuery.ChildLocation = function(name, callback) {
    console.log('ChildLocation 호출됨 : ' + name);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select address from children where name = ?", [name], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('사용자 찾음.');
                callback(null, rows);
            } else {
                console.log('사용자 찾지 못함.');
                callback(null, null);
            }
        });
    });
    
};


findQuery.MakerLocation = function(name, callback) {
    console.log('MakerLocation 호출됨 : ' + name);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select address1, address2 from makers where name = ?", [name], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('사용자 찾음.');
                callback(null, rows);
            } else {
                console.log('사용자 찾지 못함.');
                callback(null, null);
            }
        });
    });
    
};




module.exports = findQuery;