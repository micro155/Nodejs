var pool = require('./mysql_login');
const crypto = require('crypto');


var Maker = {};


Maker.MakerMain = function(id, callback) {
    console.log('MakerMain 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select notifications.title as title, date_format(notifications.start_date, '%Y-%m-%d') as start, date_format(notifications.end_date, '%Y-%m-%d') as end from notifications, contracts where notifications.volunteer = '업체' and notifications.end_date >= date(now()) and notifications.start_date <= date(now()) and contracts.contract_date > notifications.end_date and contracts.FK_maker_id = ? UNION ALL select notifications.title as title, date_format(notifications.start_date, '%Y-%m-%d') as start, date_format(notifications.end_date, '%Y-%m-%d') as end from notifications where notifications.volunteer = '업체' and notifications.end_date >= date(now()) and notifications.start_date <= date(now())", [id], function(err, rows) {
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


Maker.FindStudent = function(id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date from deliverys where FK_maker_id = ?", [id], function(err, rows) {
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


Maker.Studentlist = function(id, date, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone from students where id = (select FK_student_id from deliverys where FK_maker_id = ? and delivery_date = ?)", [id, date], function(err, rows) {
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


Maker.MakerCert = function(id, callback) {
    console.log('MakerCert 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date, pord_cert_link as link from deliverys where FK_maker_id = ? and pord_cert_link IS NOT NULL", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('업로드된 이미지 찾음.');
                callback(null, rows);
            } else {
                console.log('업로드된 이미지 없음.');
                callback(null, null);
            }
        });
    });
};


Maker.MakerUpload = function(id, link, date, callback) {
    console.log('MakerUpload 호출됨 : ' + id + ', ' + link + ', ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var data = { 
            pord_cert_link: link
        };
        
        var exec = conn.query("update deliverys set ? where FK_maker_id = ? and delivery_date = ?", [data, id, date], function(err, result) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err){
                    console.log('SQL 실행 시 에러 발생 : ' + err);
                    callback(err, null);
                    return;
            } else {
                console.log('업체 인증 링크 업로드 완료.');
                
                var exec2 = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date, pord_cert_link as link from deliverys where FK_maker_id = ? and pord_cert_link IS NOT NULL", [id], function(err, rows) {
                    console.log('실행된 SQL : ' + exec2.sql);
            
                    if(err)
                        {
                            callback(err, null);
                            return;
                        }
                    if(rows.length > 0) {
                        console.log('업체 배달인증 결과 띄우기 성공.');
                        callback(null, rows);
                    } else {
                        console.log('업체 배달인증 결과 띄우기 실패.');
                        callback(null, null);
                    }
                });
            }
        });
    });
};



Maker.MakerMypage = function(id, callback) {
    console.log('MakerMypage 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select id, name, password, phone, address1, address2, buisness_reg_num, bank, account_num from makers where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('업체 마이페이지 찾음.');
                
                const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                let result = decipher.update(rows[0].password, 'base64', 'utf8');
                result += decipher.final('utf8');
                
                rows[0].password = result;
                
                callback(null, rows);
            } else {
                console.log('업체 마이페이지 찾지 못함.');
                callback(null, null);
            }
        });
    });
};


Maker.MypageChange = function(id, password, phone, address1, address2, bank, account_num, callback) {
    console.log('MypageChange 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        const cipher = crypto.createCipher('aes-256-cbc','hiddenKey');
        let result = cipher.update(password, 'utf8', 'base64');
        result += cipher.final('base64');
        console.log('암호화된 암호 : ' + result);
        
        var change = {
            password: result,
            phone: phone,
            address1: address1,
            address2: address2,
            bank: bank,
            account_num: account_num
        };
        
        
        var exec = conn.query("update makers set ? where id = ?", [change, id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('비정상 흐름 감지.');
            } else {
                    console.log('업체 마이페이지 찾지 못함.');
                    var exec2 = conn.query("select id, password, name, phone, address1, address2, bank, account_num, buisness_reg_num from makers where id = ?", [id], function(err, rows) {
                    console.log('실행된 SQL : ' + exec2.sql);
            
                    if(err)
                        {
                            callback(err, null);
                            return;
                        }
                    if(rows.length > 0) {
                        console.log('업체 마이페이지 결과 띄우기 성공.');
                        
                        const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                        let result = decipher.update(rows[0].password, 'base64', 'utf8');
                        result += decipher.final('utf8');
                        
                        rows[0].password = result;
                        
                        callback(null, rows);
                    } else {
                        console.log('업체 마이페이지 찾지 못함.');
                        callback(null, null);
                    }
                });
            }
        });
        
    });
};


Maker.MakerApplyPage = function(title, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, title, content, food_num as num from notifications where volunteer = '업체' and title = ?", [title], function(err, rows) {
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


Maker.MakerApplySubmit = function(id, date1, date2, date3, date4, date5, num, type, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("insert into contracts(FK_maker_id, contract_date, food_num, menu_type) values (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)", [id, date1, num, type, id, date2, num, type, id, date3, num, type, id, date4, num, type, id, date5, num, type], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('비정상적 흐름 감지.');
            } else {
                console.log('업체 계약 테이블 데이터 삽입 완료.');
                
                var exec2 = conn.query("insert into deliverys(delivery_date, FK_maker_id) values (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)", [date1, id, date2, id, date3, id, date4, id, date5, id], function(err, rows) {
                console.log('실행된 SQL : ' + exec2.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('비정상적 흐름 감지.');
            } else {
                console.log('배달 테이블 데이터 입력 및 업체 공고 신청 완료.');
                callback(null, null);
            }
        });
            }
        });
    });
};


Maker.MakerApplyValid = function(title, id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, title, content, date_format(contract_date, '%Y-%m-%d') as date, menu_type as type, notifications.food_num as num from notifications, contracts where volunteer = '업체' and title = ? and contracts.contract_date > notifications.end_date and FK_maker_id = ?", [title, id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('신청된 업체 공고 찾음.');
                callback(null, rows);
            } else {
                console.log('신청된 업체 공고 찾지 못함.');
                callback(null, null);
            }
        });
    });
};



Maker.MakerApplyChange = function(id, date1, date2, date3, date4, date5, exdate1, exdate2, exdate3, exdate4, exdate5, num, type, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        
        var exec = conn.query("update contracts, notifications, deliverys set contract_date = (case when contract_date = ? then ? when contract_date = ? then ? when contract_date = ? then ? when contract_date = ? then ? when contract_date = ? then ? end), delivery_date = (case when delivery_date = ? then ? when delivery_date = ? then ? when delivery_date = ? then ? when delivery_date = ? then ? when delivery_date = ? then ? end), contracts.menu_type = ? where contracts.FK_maker_id = ? and contracts.FK_maker_id = deliverys.FK_maker_id and notifications.end_date >= date(now()) and notifications.end_date < contracts.contract_date and contracts.food_num = ?", [exdate1, date1, exdate2, date2, exdate3, date3, exdate4, date4, exdate5, date5, exdate1, date1, exdate2, date2, exdate3, date3, exdate4, date4, exdate5, date5, type, id, num], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('비정상적 흐름 감지');
            } else {
                console.log('업체 공고 신청 날짜 수정 완료');
                callback(null, null);
            }
        });
    });
};



Maker.MakerApplyList = function(id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select distinct title, date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end from notifications, contracts where notifications.volunteer = '업체' and notifications.end_date < date(now()) and notifications.end_date < any(select contract_date from contracts where FK_maker_id = ?)", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('업체 공고 신청 리스트 찾음.');
                callback(null, rows);
            } else {
                console.log('업체 공고 신청 리스트 찾지 못함.');
                callback(null, null);
            }
        });
    });
};



Maker.PastApplyDetail = function(title, id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, title, content, date_format(contract_date, '%Y-%m-%d') as date, contracts.food_num as num, contracts.menu_type as type from notifications, contracts where volunteer = '업체' and title = ? and contracts.contract_date > notifications.end_date and FK_maker_id = ?", [title, id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('신청된 지난 업체 공고 찾음.');
                callback(null, rows);
            } else {
                console.log('신청된 지난 업체 공고 찾지 못함.');
                callback(null, null);
            }
        });
    });
};



Maker.MakerCompleteSearch = function(id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(contract_date, '%Y-%m-%d') as date, food_num as num, contract_state as state, menu_type as type from contracts, deliverys where deliverys.FK_maker_id = ? and deliverys.FK_maker_id = contracts.FK_maker_id and deliverys.delivery_date = contracts.contract_date and deliverys.pord_cert_link IS NOT NULL group by contract_date", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('지난 업체 계약 내역 리스트 찾음.');
                callback(null, rows);
            } else {
                console.log('지난 업체 계약 내역 리스트 찾지 못함.');
                callback(null, null);
            }
        });
    });
};



Maker.ContractsResult = function(id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(contract_date, '%Y-%m-%d') as date, food_num as num, contract_state as state, menu_type as type from contracts where FK_maker_id = ? and date(now()) < contract_date order by contract_date asc", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('업체 계약 내역 및 총 계약금 찾음.');
                callback(null, rows);
            } else {
                console.log('업체 계약 내역 및 총 계약금 찾지 못함.');
                callback(null, null);
            }
        });
    });
};


module.exports = Maker;