var pool = require('./mysql_login');
const crypto = require('crypto');


var Manager = {};


Manager.ManagerMain = function(callback) {
    console.log('ManagerMain 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select distinct title, date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, volunteer from notifications where volunteer = '학생' and end_date >= date(now()) and start_date <= date(now()) UNION select distinct title, date_format(start_date, '%Y-%m-%d') as start, date_format(end_date, '%Y-%m-%d') as end, volunteer from notifications where volunteer = '업체' and end_date >= date(now()) and start_date <= date(now())", function(err, rows) {
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


Manager.SaveStudentNotice = function(startYear, startMonth, startDay, endYear, endMonth, endDay, title, context, callback) {
    console.log('SaveStudentNotice 호출됨 : ' + startYear + ', ' + startMonth + ', ' + startDay + ', ' + endYear + ', ' + endMonth + ', ' + endDay + ', ' + title + ', ' + context);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var start = String(startYear) + '-' + String(startMonth) + '-' + String(startDay);
        var end = String(endYear) + '-' + String(endMonth) + '-' + String(endDay);
        
        var exec = conn.query("insert into notifications(written_date, start_date, end_date, volunteer, content, title) values (now(), STR_TO_DATE(?, '%Y-%m-%d') , STR_TO_DATE(?, '%Y-%m-%d'), '학생', ?, ?)", [start, end, context, title], function(err) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            console.log('공고 내용 입력 완료');
        });
    });
};


Manager.SaveMakerNotice = function(startYear, startMonth, startDay, endYear, endMonth, endDay, title, context, num, callback) {
    console.log('SaveMakerNotice 호출됨 : ' + startYear + ', ' + startMonth + ', ' + startDay + ', ' + endYear + ', ' + endMonth + ', ' + endDay + ', ' + title + ', ' + context + ', ' + num);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var start = String(startYear) + '-' + String(startMonth) + '-' + String(startDay);
        var end = String(endYear) + '-' + String(endMonth) + '-' + String(endDay);
        
        var exec = conn.query("insert into notifications(written_date, start_date, end_date, volunteer, content, title, food_num) values (now(), STR_TO_DATE(?, '%Y-%m-%d') , STR_TO_DATE(?, '%Y-%m-%d'), '업체', ?, ?, ?)", [start, end, context, title, num], function(err) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            console.log('공고 내용 입력 완료');
        });
    });
};


Manager.AllocationList = function(callback) {
    console.log('AllocationList 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select distinct date_format(delivery_date, '%Y-%m-%d') as date from deliverys where FK_maker_id IS NOT NULL order by date asc", function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('계약된 업체 목록 찾음.');
                callback(null, rows);
            } else {
                console.log('계약된 업체 목록 찾지 못함.');
                callback(null, null);
            }
        });
    });
};




Manager.FindMaker = function(date, callback) {
    console.log('FindMaker 호출됨 : ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone, address1, address2 from makers where id = any(select FK_maker_id from deliverys where delivery_date = ?)", [date], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('계약한 업체 찾음.');
                callback(null, rows);
            } else {
                console.log('계약한 업체 찾지 못함.');
                callback(null, null);
            }
        });
    });
};


Manager.StudentValid = function(name, date, callback) {
    console.log('StudentValid 호출됨 : ' + name + ', ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone, address1, address2 from students where id = any(select FK_student_id from deliverys where delivery_date = ? and FK_maker_id = any(select id from makers where name = ?)) UNION select name as Mname, phone as Mphone, address1 as Maddress1, address2 as Maddress2 from makers where name = ?", [date, name, name], function(err, rows) {
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




Manager.AllocationPage = function(name, date, callback) {
    console.log('AllocationPage 호출됨 : ' + name + ', ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select address1, address2 from makers where name = ? UNION select name, phone from students where id = any(select FK_student_id from deliverys where FK_maker_id = any(select id from makers where name = ?) and delivery_date = ?)", [name, name, date], function(err, rows) {
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


Manager.StudentAllocationValid = function(date, callback) {
    console.log('StudentAllocationValid 호출됨 : ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone, address1, address2 from students where id = any(select student_applications.FK_student_id from student_applications, deliverys where apply_date = ? and delivery_date = ? and deliverys.FK_student_id IS NULL) ", [date, date], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('미배정된 배달원 찾음.');
                callback(null, rows);
            } else {
                console.log('미배정된 배달원 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.Allocation = function(name, date, callback) {
    console.log('Allocation 호출됨 : ' + name + ', ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        
        var exec = conn.query("update deliverys set FK_student_id = (select id from students where name = ?) where deliverys.delivery_date = ?", [name, date], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('비정상적인 흐름 감지.');
            } else {
                console.log('배정 완료.');
                callback(null, null);
            }     
        });
    });
};


Manager.CertValidFirst = function(callback) {
    console.log('CertValidFirst 호출됨. ');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select distinct date_format(delivery_date, '%Y-%m-%d') as date from deliverys where FK_student_id IS NOT NULL order by date asc", function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달 날짜 찾음');
                callback(null, rows);
            } else {
                console.log('배달 날짜 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.StudentCertList = function(date, callback) {
    console.log('StudentCertList 호출됨 : ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone from students where id = any(select FK_student_id from deliverys where delivery_date = ?)", [date], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달원 목록 찾음');
                callback(null, rows);
            } else {
                console.log('배달원 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.CertDeliveryValid = function(name, callback) {
    console.log('CertDeliveryValid 호출됨 : ' + name);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date, count(FK_student_id) as count, address, delivery_state as state from deliverys where FK_student_id = any(select id from students where name = ?) and delivery_cert_link IS NOT NULL group by address order by delivery_date asc", [name], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달원 인증 목록 찾음');
                callback(null, rows);
            } else {
                console.log('배달원 인증 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.CertDetail = function(name, date, address, callback) {
    console.log('CertDetail 호출됨 : ' + name + ', ' + date + ', ' + address);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select delivery_cert_link as link, children.name as name from deliverys, children where deliverys.address = ? and children.address = deliverys.address and delivery_date = ? and FK_student_id = any(select id from students where name = ?)", [address, date, name], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달원 인증 상세 내역 찾음');
                callback(null, rows);
            } else {
                console.log('배달원 인증 상세 내역 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.ChangeDeliveryState = function(sname, address, state, date, callback) {
    console.log('CertDetail 호출됨 : ' + sname + ', ' + address + ', ' + state + ', ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("update deliverys set delivery_state = ? where FK_student_id = (select id from students where name = ?) and deliverys.address = ? and delivery_date = ?", [state, sname, address, date], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('비정상적인 흐름 감지.');
                
            } else {
                console.log('배달 상태 수정 완료.');
                
                var exec2 = conn.query("select delivery_cert_link as link, children.name as name from deliverys, children where deliverys.address = ? and children.address = deliverys.address and delivery_date = ? and FK_student_id = any(select id from students where name = ?)", [address, date, sname], function(err, rows) {
            console.log('실행된 SQL : ' + exec2.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달원 인증 상세 내역 찾음');
                callback(null, rows);
            } else {
                console.log('배달원 인증 상세 내역 찾지 못함.');
                callback(null, null);
            }     
        });
            }     
        });
    });
};


Manager.ContractDatelist = function(callback) {
    console.log('ContractDatelist 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select distinct date_format(contract_date, '%Y-%m-%d') as date from contracts order by date asc", function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('납품 계약 날짜 찾음');
                callback(null, rows);
            } else {
                console.log('납품 계약 날짜 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};



Manager.MakerMakeList = function(date, callback) {
    console.log('MakerMakeList 호출됨 : ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone, address1, address2, bank, account_num from makers where id = any(select FK_maker_id from contracts where contract_date = ?)", [date],  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('납품 계약 업체 리스트 찾음');
                callback(null, rows);
            } else {
                console.log('납품 계약 업체 리스트 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};



Manager.ContractDetail = function(date, name, callback) {
    console.log('ContractDetail 호출됨 : ' + date + ', ' + name);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(contract_date, '%Y-%m-%d') as date, food_num as food, contract_state as state from contracts where contract_date = ? and FK_maker_id = (select id from makers where name = ?)", [date, name],  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('납품 계약 정보 찾음');
                callback(null, rows);
            } else {
                console.log('납품 계약 정보 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.MakerValidLinkState = function(date, callback) {
    console.log('MakerValidLinkState 호출됨 : ' + date);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select pord_cert_link from deliverys where delivery_date = ?", [date],  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('납품 인증 링크 찾음');
                callback(null, rows);
            } else {
                console.log('납품 인증 링크 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};



Manager.ChangeState = function(date, state, name, callback) {
    console.log('ChangeState 호출됨 : ' + date + ', ' + state + ', ' + name);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("update contracts set contract_state = ? where contract_date = ? and FK_maker_id = (select id from makers where name = ?)", [state, date, name],  function(err, rows) {
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
                console.log('납품 계약 상태 수정 완료.');
                var exec2 = conn.query("select pord_cert_link from deliverys where delivery_date = ?", [date],  function(err, rows) {
            console.log('실행된 SQL : ' + exec2.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('납품 인증 링크 찾음');
                callback(null, rows);
            } else {
                console.log('납품 인증 링크 찾지 못함.');
                callback(null, null);
            }     
        });
            }     
        });
    });
};


Manager.ChildManagePage = function(callback) {
    console.log('ChildManagePage 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone, address, emergency_phone as ephone from children",  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('결식 아동 목록 찾음');
                callback(null, rows);
            } else {
                console.log('결식 아동 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.InsertNewChild = function(id, name, phone, address, ephone, callback) {
    console.log('MakerCert 호출됨 : ' + id + ', ' + name + ', ' + phone + ', ' + address + ', ' + ephone);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("insert into children values (?, ?, ?, ?, ?)", [id, name, phone, address, ephone], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('비정상적인 흐름.');
            } else {
                console.log('결식 아동 입력 완료');
                
        }
    });
});
};


Manager.MakerList = function(callback) {
    console.log('MakerList 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone, address1, address2, buisness_reg_num as bnum, bank, account_num as account from makers",  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('등록 업체 목록 찾음');
                callback(null, rows);
            } else {
                console.log('등록 업체 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.StudentList = function(callback) {
    console.log('StudentList 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone, address1, address2, no_show_count as count from students",  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('등록 배달원 목록 찾음');
                callback(null, rows);
            } else {
                console.log('등록 배달원 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};



Manager.StudentNoShow = function(callback) {
    console.log('StudentNoShow 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select name, phone, address1, address2, no_show_count as count from students",  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('등록 배달원 노쇼 목록 찾음');
                callback(null, rows);
            } else {
                console.log('등록 배달원 노쇼 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.NoShowChange = function (count, name, callback) {
    console.log('NoShowChange 호출됨 : ' + count + ', ' + name);

    pool.getConnection(function (err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var exec = conn.query("update students set no_show_count = ? where name = ?", [count, name], function (err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);

            if (err) {
                callback(err, null);
                return;
            }
            if (rows.length > 0) {
                console.log('비정상적인 흐름.');
            } else {
                console.log('결식 아동 입력 완료');
                var exec2 = conn.query("select name, phone, address1, address2, no_show_count as count from students", function (err, rows) {
                    console.log('실행된 SQL : ' + exec2.sql);

                    if (err) {
                        callback(err, null);
                        return;
                    }
                    if (rows.length > 0) {
                        console.log('등록 배달원 노쇼 목록 찾음.');
                        callback(null, rows);
                    } else {
                        console.log('등록 배달원 노쇼 목록 찾지 못함.');
                        callback(null, null);
                    }
                });
            }
        });
    });
};


Manager.ChildArrangementFirstPage = function(callback) {
    console.log('ChildArrangementFirstPage 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select distinct address, date_format(delivery_date, '%Y-%m-%d') as date, child_id as cid from deliverys where child_id IS NOT NULL",  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('결식 아동 목록 찾음');
                callback(null, rows);
            } else {
                console.log('결식 아동 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.ChildArrangementSecondPage = function(callback) {
    console.log('ChildArrangementSecondPage 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select id, name, phone, address from children",  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('결식 아동 목록 찾음');
                callback(null, rows);
            } else {
                console.log('결식 아동 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.ChildArrangementThirdPage = function(callback) {
    console.log('ChildArrangementThirdPage 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(delivery_date, '%Y-%m-%d') as date, makers.address1 as address1, makers.address2 as address2, makers.name as name, contracts.menu_type as type from deliverys, makers, contracts where deliverys.child_id IS NULL and deliverys.delivery_date = contracts.contract_date and deliverys.FK_maker_id = contracts.FK_maker_id and deliverys.FK_maker_id = makers.id", function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('결식 아동이 배정되지 않은 급식 일자 목록 찾음');
                callback(null, rows);
            } else {
                console.log('결식 아동이 배정되지 않은 급식 일자 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


Manager.ChildArrangement = function(id, date, address, callback) {
    console.log('ChildArrangement 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("update deliverys set child_id = ?, address = ? where delivery_date = ?", [id, address, date],  function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('비정상적인 흐름 감지.');
            } else {
                console.log('결식 아동 급식일 배정 완료.');
                callback(null, null);
            }     
        });
    });
};


Manager.ManagerMypage = function(id, callback) {
    console.log('ManagerMypage 호출됨 : ' + id);
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select id, password, manager_name as Gname, manage_person_name as Mname, manage_person_phone as phone from managers where id = ?", [id], function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('지자체 마이페이지 찾음.');
                
                const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                let result = decipher.update(rows[0].password, 'base64', 'utf8');
                result += decipher.final('utf8');
                
                rows[0].password = result;
                
                callback(null, rows);
            } else {
                console.log('지자체 마이페이지 찾지 못함.');
                callback(null, null);
            }
        });
    });
};


Manager.MypageChange = function(id, password, name, phone, callback) {
    console.log('MypageChange 호출됨 : ' + id + ', ' + password + ', ' + name + ', ' + phone);
    
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
            manage_person_name: name,
            manage_person_phone: phone
        };
        
        
        var exec = conn.query("update managers set ? where id = ?", [change, id], function(err, rows) {
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
                    var exec2 = conn.query("select id, password, manager_name as Gname, manage_person_name as Mname, manage_person_phone as phone from managers where id = ?", [id], function(err, rows) {
                    console.log('실행된 SQL : ' + exec2.sql);
            
                    if(err)
                        {
                            callback(err, null);
                            return;
                        }
                    if(rows.length > 0) {
                        console.log('지자체 마이페이지 결과 띄우기 성공.');
                        
                        const decipher = crypto.createDecipher('aes-256-cbc', 'hiddenKey');
                        let result = decipher.update(rows[0].password, 'base64', 'utf8');
                        result += decipher.final('utf8');
                        
                        rows[0].password = result;
                        
                        callback(null, rows);
                    } else {
                        console.log('지자체 마이페이지 찾지 못함.');
                        callback(null, null);
                    }
                });
            }
        });
        
    });
};



Manager.MakerContractResult = function(callback) {
    console.log('MakerContractResult 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(contracts.contract_date, '%Y-%m-%d') as date, contracts.food_num as num, contracts.menu_type as type, makers.name as name, makers.id as id from contracts, makers where makers.name = any(select makers.name from makers, contracts where makers.id = contracts.FK_maker_id) order by contracts.contract_date desc", function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('업체 공고 결과 및 업체 계약 내역 찾음');
                callback(null, rows);
            } else {
                console.log('업체 공고 결과 및 업체 계약 내역 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};



Manager.StudentApplyResult = function(callback) {
    console.log('StudentApplyResult 호출됨.');
    
    pool.getConnection(function(err, conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var exec = conn.query("select date_format(apply_date, '%Y-%m-%d') as date, student_applications.delivery_location as location, students.name as name, students.id as id from student_applications, students where students.name = any(select name from students where id = student_applications.FK_student_id) order by apply_date desc", function(err, rows) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            
            if(err)
                {
                    callback(err, null);
                    return;
                }
            if(rows.length > 0) {
                console.log('배달원 공고 결과 목록 찾음');
                callback(null, rows);
            } else {
                console.log('배달원 공고 결과 목록 찾지 못함.');
                callback(null, null);
            }     
        });
    });
};


module.exports = Manager;