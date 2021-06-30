var pool = require('./mysql_login');
const crypto = require('crypto');


var database = {};


database.addStudent = function(id, name, phone, password, address1, address2, callback) {
    console.log('addStudent 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결의 스레드 아이디 : ' + conn.threadId);
        
        const cipher = crypto.createCipher('aes-256-cbc','hiddenKey');
        let result = cipher.update(password, 'utf8', 'base64');
        result += cipher.final('base64');
        console.log('암호화된 암호 : ' + result);

            var data = {
                id: id,
                name: name,
                phone: phone,
                password: result,
                address1: address1,
                address2: address2
            };
            var exec = conn.query('insert into students set ?', data, function (err, result) {
                conn.release();
                console.log('실행된 SQL : ' + exec.sql);

                if (err) {
                    console.log('SQL 실행 시 에러 발생 : ' + err);
                    callback(err, null);
                    return;
                }

                callback(null, result);
            });
    }); 
};


database.addMaker = function(id, name, password, phone, address1, address2, bank, buisness_reg_num, account_num, callback) {
    console.log('addMaker 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결의 스레드 아이디 : ' + conn.threadId);
        
        const cipher = crypto.createCipher('aes-256-cbc','hiddenKey');
        let result = cipher.update(password, 'utf8', 'base64');
        result += cipher.final('base64');
        console.log('암호화된 암호 : ' + result);
        
            var data = {
                id: id,
                name: name,
                password: result,
                phone: phone,
                address1: address1,
                address2: address2,
                bank: bank,
                buisness_reg_num: buisness_reg_num,
                account_num: account_num
            };
            var exec = conn.query('insert into makers set ?', data, function (err, res) {
                conn.release();
                console.log('실행된 SQL : ' + exec.sql);

                if (err) {
                    console.log('SQL 실행 시 에러 발생 : ' + err);
                    callback(err, null);
                    return;
                }

                callback(null, res);
            });
    });
};


database.addManager = function(id, password, manager_name, manage_person_name, manage_person_phone, callback) {
    console.log('addGover 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결의 스레드 아이디 : ' + conn.threadId);
        
        const cipher = crypto.createCipher('aes-256-cbc','hiddenKey');
        let result = cipher.update(password, 'utf8', 'base64');
        result += cipher.final('base64');
        console.log('암호화된 암호 : ' + result);
        
            var data = {
                id: id,
                password: result,
                manager_name: manager_name,
                manage_person_name: manage_person_name,
                manage_person_phone: manage_person_phone
            };
            
            var exec = conn.query('insert into managers set ?', data, function (err, result) {
                conn.release();
                console.log('실행된 SQL : ' + exec.sql);

                if (err) {
                    console.log('SQL 실행 시 에러 발생 : ' + err);
                    callback(err, null);
                    return;
                }
                
                callback(null, result);
            });
    });
};


database.authStudents = function(id, password, callback) {
    console.log('authStudents 호출됨 : ' + id + ', ' + password);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select password from students where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                let result = decipher.update(rows[0].password, 'base64', 'utf8');
                result += decipher.final('utf8');
                
                if(password == result) {
                    console.log('비밀번호 일치함.');
                    
                    var exec2 = conn.query("select notifications.title as title, date_format(notifications.start_date, '%Y-%m-%d') as start, date_format(notifications.end_date, '%Y-%m-%d') as end from notifications, student_applications where notifications.volunteer = '학생' and notifications.end_date >= date(now()) and notifications.start_date <= date(now()) and student_applications.apply_date > notifications.end_date and student_applications.FK_student_id = ? UNION ALL select notifications.title as title, date_format(notifications.start_date, '%Y-%m-%d') as start, date_format(notifications.end_date, '%Y-%m-%d') as end from notifications where notifications.volunteer = '학생' and notifications.end_date >= date(now()) and notifications.start_date <= date(now())", [id], function (err, rows) {
                        console.log('실행된 SQL : ' + exec.sql);

                        if (err) {
                            callback(err, null);
                            return;
                        }
                        if (rows.length > 0) {
                            console.log('공고 중인 데이터 찾음.');
                            callback(null, rows);
                        } else {
                            console.log('공고 중인 데이터 찾지 못함.');
                            callback(null, null);
                        }
                    });
                } else {
                    console.log('비밀번호가 일치하지 않음.');
                    var result1 = 'O';
                    callback(null, result1);
                }
            } else {
                console.log('사용자 찾지 못함.');
                var result2 = 'X';
                callback(null, result2);
            }
        });
    });
};


database.authMakers = function(id, password, callback) {
    console.log('authMakers 호출됨 : ' + id + ', ' + password);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select password from makers where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                let result = decipher.update(rows[0].password, 'base64', 'utf8');
                result += decipher.final('utf8');
                
                if (password == result) {
                    console.log('비밀번호 일치함.');

                    var exec2 = conn.query("select notifications.title as title, date_format(notifications.start_date, '%Y-%m-%d') as start, date_format(notifications.end_date, '%Y-%m-%d') as end from notifications, contracts where notifications.volunteer = '업체' and notifications.end_date >= date(now()) and notifications.start_date <= date(now()) and contracts.contract_date > notifications.end_date and contracts.FK_maker_id = ? UNION ALL select notifications.title as title, date_format(notifications.start_date, '%Y-%m-%d') as start, date_format(notifications.end_date, '%Y-%m-%d') as end from notifications where notifications.volunteer = '업체' and notifications.end_date >= date(now()) and notifications.start_date <= date(now())", [id], function (err, rows) {
                        console.log('실행된 SQL : ' + exec2.sql);

                        if (err) {
                            callback(err, null);
                            return;
                        }
                        if (rows.length > 0) {
                            console.log('공고 중인 데이터 찾음.');
                            callback(null, rows);
                        } else {
                            console.log('공고 중인 데이터 찾지 못함.');
                            callback(null, null);
                        }
                    });

                } else {
                    console.log('비밀번호가 일치하지 않음.');
                    var result1 = 'O';
                    callback(null, result1);
                }
            } else {
                console.log('사용자 찾지 못함.');
                var result2 = 'X';
                callback(null, result2);
            }
        });
    });
    
};



database.authManagers = function(id, password, callback) {
    console.log('authManagers 호출됨 : ' + id + ', ' + password);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select password from managers where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                let result = decipher.update(rows[0].password, 'base64', 'utf8');
                result += decipher.final('utf8');
                
                if(password == result) {
                    console.log('비밀번호 일치함.');
                    
                    var exec2 = conn.query("select distinct title, date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, volunteer from notifications where volunteer = '학생' and end_date >= date(now()) and start_date <= date(now()) UNION select distinct title, date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, volunteer from notifications where volunteer = '업체' and end_date >= date(now()) and start_date <= date(now())", function (err, rows) {
                        console.log('실행된 SQL : ' + exec2.sql);

                        if (err) {
                            callback(err, null);
                            return;
                        }
                        if (rows.length > 0) {
                            console.log('공고 중인 데이터 찾음.');
                            callback(null, rows);
                        } else {
                            console.log('공고 중인 데이터 찾지 못함.');
                            callback(null, null);
                        }
                    });
                    
                } else {
                    console.log('비밀번호가 일치하지 않음.');
                    var result1 = 'O';
                    callback(null, result1);
                }
            } else {
                console.log('사용자 찾지 못함.');
                var result2 = 'X';
                callback(null, result2);
            }
        });
    });
};


module.exports = database;