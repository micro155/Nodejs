var pool = require('./mysql_login');
const crypto = require('crypto');


var Student = {};


Student.StudentMain = function(id, callback) {
    console.log('StudentMain 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select notifications.title as title, date_format(notifications.start_date, '%Y-%m-%d') as start, date_format(notifications.end_date, '%Y-%m-%d') as end from notifications, student_applications where notifications.volunteer = '학생' and notifications.end_date >= date(now()) and notifications.start_date <= date(now()) and student_applications.apply_date > notifications.end_date and student_applications.FK_student_id = ? UNION ALL select notifications.title as title, date_format(notifications.start_date, '%Y-%m-%d') as start, date_format(notifications.end_date, '%Y-%m-%d') as end from notifications where notifications.volunteer = '학생' and notifications.end_date >= date(now()) and notifications.start_date <= date(now())", [id], function(err, rows) {
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


Student.FirstPageDelivery = function(id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date from deliverys where FK_student_id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달 날짜 찾음.');
                callback(null, rows);
            } else {
                console.log('배달 날짜 찾지 못함.');
                callback(null, null);
            }
        });
    });
};



Student.FindDelivery = function(id, date, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select makers.name as name, makers.address1 as mad1 , makers.address2 as mad2, children.address as cad, children.name as cname from makers, children where makers.id = (select FK_maker_id from deliverys where FK_student_id = ? and delivery_date = ?) and children.id = (select child_id from deliverys where FK_student_id = ? and delivery_date = ?)", [id, date, id, date], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('업체 및 배달지 주소 찾음.');
                callback(null, rows);
            } else {
                console.log('업체 및 배달지 주소 찾지 못함.');
                callback(null, null);
            }
        });
    });
};




Student.StudentCert = function(id, callback) {
    console.log('StudentCert 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date, address, delivery_cert_link as link from deliverys where FK_student_id = ? and delivery_cert_link IS NOT NULL", [id], function(err, rows) {
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


Student.StudentUpload = function(StudentID, address, delivery_cert_link, date, callback) {
    console.log('StudentUpload 호출됨 : ' + StudentID + ', ' + address + ', ' + delivery_cert_link + ', ' + date);
    
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
            delivery_cert_link: delivery_cert_link
        };
        
        var exec = conn.query("update deliverys set ? where FK_student_id = ? and address = ? and delivery_date = ?", [data, StudentID, address, date], function(err, result) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err){
                    console.log('SQL 실행 시 에러 발생 : ' + err);
                    callback(err, null);
                    return;
            } else {
                var exec2 = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date, address, delivery_cert_link as link from deliverys where FK_student_id = ? and delivery_cert_link IS NOT NULL", [StudentID], function(err, rows) {
                    console.log('실행된 SQL : ' + exec2.sql);
            
                    if(err)
                        {
                            callback(err, null);
                            return;
                        }
                    if(rows.length > 0) {
                        console.log('배달원 배달인증 결과 띄우기 성공.');
                        
                        callback(null, rows);
                    } else {
                        console.log('배달원 배달인증 결과 띄우기 실패.');
                        callback(null, null);
                    }
                });
            }
        });
    });
};


Student.StudentMypage = function(id, callback) {
    console.log('StudentMypage 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select id, name, password, phone, address1, address2, delivery_location from students where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('학생 마이페이지 찾음.');
                
                const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                let result = decipher.update(rows[0].password, 'base64', 'utf8');
                result += decipher.final('utf8');
                
                rows[0].password = result;
                
                callback(null, rows);
            } else {
                console.log('학생 마이페이지 찾지 못함.');
                callback(null, null);
            }
        });
    });
};


Student.MypageChange = function(id, password, phone, address1, address2, delivery_location, callback) {
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
            delivery_location: delivery_location
        };
        
        
        var exec = conn.query("update students set ? where id = ?", [change, id], function(err, rows) {
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
                    var exec2 = conn.query("select id, password, name, phone, address1, address2, delivery_location from students where id = ?", [id], function(err, rows) {
                    console.log('실행된 SQL : ' + exec2.sql);
            
                    if(err)
                        {
                            callback(err, null);
                            return;
                        }
                    if(rows.length > 0) {
                        console.log('학생 마이페이지 결과 띄우기 성공.');
                        
                        const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                        let result = decipher.update(rows[0].password, 'base64', 'utf8');
                        result += decipher.final('utf8');
                        
                        rows[0].password = result;
                        
                        callback(null, rows);
                    } else {
                        console.log('학생 마이페이지 찾지 못함.');
                        callback(null, null);
                    }
                });
            }
        });
        
    });
};


Student.StudentApplyPage = function(title, id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, title, content, delivery_location as location from notifications, students where volunteer = '학생' and title = ? and students.id = ?", [title, id], function(err, rows) {
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


Student.StudentApplySubmit = function(id, date1, date2, date3, date4, date5, location, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("insert into student_applications values (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)", [date1, id, location, date2, id, location, date3, id, location, date4, id, location, date5, id, location], function(err, rows) {
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
                console.log('배달원 공고 신청 완료.');
                callback(null, null);
            }
        });
    });
};


Student.StudentApplyValid = function(title, id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, title, content, date_format(apply_date, '%Y-%m-%d') as date, student_applications.delivery_location as location from notifications, student_applications where volunteer = '학생' and title = ? and student_applications.apply_date > notifications.end_date and FK_student_id = ?", [title, id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('신청된 배달원 공고 찾음.');
                callback(null, rows);
            } else {
                console.log('신청된 배달원 공고 찾지 못함.');
                callback(null, null);
            }
        });
    });
};



Student.StudentApplyChange = function(id, date1, date2, date3, date4, date5, exdate1, exdate2, exdate3, exdate4, exdate5, location, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        
        var exec = conn.query("update student_applications, notifications set apply_date = (case when apply_date = ? then ? when apply_date = ? then ? when apply_date = ? then ? when apply_date = ? then ? when apply_date = ? then ? end) where FK_student_id = ? and notifications.end_date >= date(now()) and notifications.end_date < student_applications.apply_date and delivery_location = ?", [exdate1, date1, exdate2, date2, exdate3, date3, exdate4, date4, exdate5, date5, id, location], function(err, rows) {
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
                console.log('배달원 공고 신청 날짜 수정 완료');
                callback(null, null);
            }
        });
    });
};



Student.StudentApplyList = function(id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select distinct title, date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end from notifications, student_applications where notifications.volunteer = '학생' and notifications.end_date < date(now()) and notifications.end_date < any(select apply_date from student_applications where FK_student_id = ?)", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달원 공고 신청 리스트 찾음.');
                callback(null, rows);
            } else {
                console.log('배달원 공고 신청 리스트 찾지 못함.');
                callback(null, null);
            }
        });
    });
};



Student.PastApplyDetail = function(title, id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, title, content, date_format(apply_date, '%Y-%m-%d') as date, student_applications.delivery_location as location from notifications, student_applications where volunteer = '학생' and title = ? and student_applications.apply_date > notifications.end_date and FK_student_id = ?", [title, id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('신청된 지난 배달원 공고 찾음.');
                callback(null, rows);
            } else {
                console.log('신청된 지난 배달원 공고 찾지 못함.');
                callback(null, null);
            }
        });
    });
};



Student.StudentCompleteSearch = function(id, callback) {
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date, delivery_location as location, count(delivery_date) as count from deliverys, student_applications where deliverys.FK_student_id = ? and deliverys.FK_student_id = student_applications.FK_student_id and deliverys.delivery_date = student_applications.apply_date and deliverys.delivery_cert_link IS NOT NULL group by delivery_date", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달원 공고 신청 리스트 찾음.');
                callback(null, rows);
            } else {
                console.log('배달원 공고 신청 리스트 찾지 못함.');
                callback(null, null);
            }
        });
    });
};




module.exports = Student;