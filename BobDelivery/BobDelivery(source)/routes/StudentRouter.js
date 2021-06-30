var express = require('../node_modules/express');
var multer = require('multer');
var cors = require('cors');
var path = require('path');
var cookie = require('../node_modules/cookie');


var StudentRouter = express.Router();
var Student = require('../database/Student_loader');

var app = express();


app.use('/', StudentRouter);
app.use(cors());

app.set('view engine', 'ejs');



StudentRouter.route('/process/Student_Main').post(function(req, res) {
    console.log('/process/Student_Main 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    res.cookie('LoginID', paramId);

    
        Student.StudentMain(paramId, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_main.ejs', {data: rows, StudentID: paramId}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('에러 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
                var data;
                
               res.app.render('student_main.ejs', {data: data, StudentID: paramId}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            }
        });
});

StudentRouter.route('/process/Student_FirstPageDelivery').post(function(req, res) {
    console.log('/process/Student_FirstPageDelivery 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    console.log('요청 파라미터 : ' + paramId);
    
    
        Student.FirstPageDelivery(paramId, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_deliveryValid.ejs', {data: rows, StudentID: paramId}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('배정된 배달 날짜가 존재하지 않음');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('student_deliveryValid.ejs', {data: data, StudentID: paramId}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            }
        });
});


StudentRouter.route('/process/Student_FindDelivery').post(function(req, res) {
    console.log('/process/Student_FindDelivery 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    
    console.log('요청 파라미터 : ' + paramDate);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var studentID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + studentID);
    
    
        Student.FindDelivery(studentID, paramDate, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_deliveryValid_2.ejs', {data: rows, origin: paramDate, StudentID: studentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('배정된 업체 및 배달지가 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('student_deliveryValid_2.ejs', {data: data, origin: paramDate, StudentID: studentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            }
        });
});




StudentRouter.route('/process/Student_CertPage').post(function(req, res) {
    console.log('/process/Student_CertPage 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    
        Student.StudentCert(paramId, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_cert_delivery.ejs', {data: rows, StudentID: paramId}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('업로드 되지 않은 첫화면 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
                
               res.app.render('student_cert_delivery.ejs', {data: data, StudentID: paramId}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            }
        });
});


var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads');
    },
    filename : function(req, file, callback) {
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extension);
        callback(null, basename + Date.now() + extension);
    }
});

var upload = multer({
    storage:storage,
    limits:{
        files:10,
        fileSize:1024*1024*1024
    }
});

StudentRouter.route('/process/Student_ImageUpload').post(upload.array('photo',1), function(req, res) {
    console.log('/process/Student_ImageUpload 라우팅 함수 호출됨.');
    
    var paramAddress = req.body.address || req.query.address;
    var paramStudentID = req.body.StudentID || req.query.StudentID;
    var paramYear = req.body.year || req.query.year;
    var paramMonth = req.body.month || req.query.month;
    var paramDay = req.body.day || req.query.day;
    
    var paramDate = paramYear + '-' + paramMonth + '-' + paramDay;
    
    console.log('요청 파라미터 : ' + paramDate + ', ' + paramStudentID + ', ' + paramAddress);
    
    var files = req.files;
    console.log('====업로드된 파일====');
    if(files.length > 0){
    console.dir(files[0].path);
    } else {
        console.log('파일이 없습니다.');
    }
    
    var originalname;
    var filename;
    var mimetype;
    var size;
    
    if(Array.isArray(files)) {
        for(var i = 0; i < files.length; i++){
            originalname = files[i].originalname;
            filename = files[i].filename;
            mimetype = files[i].mimetype;
            size = files[i].size;
        }
    }
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
    
    var paramlink = 'http://bobdelivery.toast.paas-ta.com/uploads/' + filename;
    
    console.log(paramlink);
    
    Student.StudentUpload(paramStudentID, paramAddress, paramlink, paramDate, function(err, UploadComplete) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(UploadComplete) {
            console.dir(UploadComplete);
                
            res.app.render('student_cert_delivery.ejs', {data: UploadComplete, StudentID: paramStudentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
        } else {
            console.log('에러 발생.');
            res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
            res.write('<h1>오류로 인해 이미지 업로드가 완료되지 않았습니다.</h1>');
            res.end();
        }
    });
});


StudentRouter.route('/process/Student_mypage').post(function(req, res) {
    console.log('/process/Student_mypage 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    
        Student.StudentMypage(paramId, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_mypage.ejs', {data: rows, StudentID: paramId}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('에러 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>사용자 개인정보 조회 안됨.</h1>');
               res.end();
            }
        });
});


StudentRouter.route('/process/Student_mypage_change').post(function(req, res) {
    console.log('/process/Student_mypage_change 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramPhone = req.body.phone || req.query.phone;
    var paramAddress1 = req.body.address1 || req.query.address1;
    var paramAddress2 = req.body.address2 || req.query.address2;
    var paramLocation = req.body.location || req.query.location;
    
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramPhone + ', ' + paramAddress1 + ', ' + paramAddress2 + ', ' + paramLocation);
    
        Student.MypageChange(paramId, paramPassword, paramPhone, paramAddress1, paramAddress2, paramLocation, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_mypage.ejs', {data: rows, StudentID: paramId}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('에러 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>사용자 개인정보 조회 안됨.</h1>');
               res.end();
            }
        });
});



StudentRouter.route('/process/Student_ApplyPage').post(function(req, res) {
    console.log('/process/Student_ApplyPage 라우팅 함수 호출됨.');
    
    var paramTitle = req.body.title || req.query.title;
    
    console.log('요청 파라미터 : ' + paramTitle);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var studentID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + studentID);
    
    
        Student.StudentApplyPage(paramTitle, studentID, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_apply.ejs', {data: rows, StudentID: studentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('에러 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>진행 중인 배달원 공고 정보 조회 안됨.</h1>');
               res.end();
            }
        });
});



StudentRouter.route('/process/Student_ApplySubmit').post(function(req, res) {
    console.log('/process/Student_ApplySubmit 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramDate1 = req.body.date1 || req.query.date1;
    var paramDate2 = req.body.date2 || req.query.date2;
    var paramDate3 = req.body.date3 || req.query.date3;
    var paramDate4 = req.body.date4 || req.query.date4;
    var paramDate5 = req.body.date5 || req.query.date5;
    var paramLocation = req.body.location || req.query.location;
    
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramDate1 + ', ' + paramDate2 + ', ' + paramDate3 + ', ' + paramDate4 + ', ' + paramDate5 + ', ' + paramLocation);
    
    
        Student.StudentApplySubmit(paramId, paramDate1, paramDate2, paramDate3, paramDate4, paramDate5, paramLocation, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 : 입력된 값이 잘못되었습니다.</h1>');
               res.write('<a href="javascript:window.history.back();">돌아가기</a>');
               res.end();
               return ;
           }
            console.log('배달원 공고 신청 DB 저장 완료.');
        });
});



StudentRouter.route('/process/Student_ApplyValid').post(function(req, res) {
    console.log('/process/Student_ApplyValid 라우팅 함수 호출됨.');
    
    var paramTitle = req.body.title || req.query.title;
    
    console.log('요청 파라미터 : ' + paramTitle);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var studentID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + studentID);
    
    
        Student.StudentApplyValid(paramTitle, studentID, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_apply.ejs', {data: rows, StudentID: studentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('에러 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>신청한 배달원 공고 정보 조회 안됨.</h1>');
               res.end();
            }
        });
});


StudentRouter.route('/process/Student_ApplyChange').post(function(req, res) {
    console.log('/process/Student_ApplyChange 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramDate1 = req.body.date1 || req.query.date1;
    var paramDate2 = req.body.date2 || req.query.date2;
    var paramDate3 = req.body.date3 || req.query.date3;
    var paramDate4 = req.body.date4 || req.query.date4;
    var paramDate5 = req.body.date5 || req.query.date5;
    
    var paramExdate1 = req.body.exdate1 || req.query.exdate1;
    var paramExdate2 = req.body.exdate2 || req.query.exdate2;
    var paramExdate3 = req.body.exdate3 || req.query.exdate3;
    var paramExdate4 = req.body.exdate4 || req.query.exdate4;
    var paramExdate5 = req.body.exdate5 || req.query.exdate5;
    
    var paramLocation = req.body.location || req.query.location;
    
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramDate1 + ', ' + paramDate2 + ', ' + paramDate3 + ', ' + paramDate4 + ', ' + paramDate5 + ', ' + paramExdate1 + ', ' + paramExdate2 + ', ' + paramExdate3 + ', ' + paramExdate4 + ', ' + paramExdate5 + ', ' + paramLocation);
    
    
        Student.StudentApplyChange(paramId, paramDate1, paramDate2, paramDate3, paramDate4, paramDate5, paramExdate1, paramExdate2, paramExdate3, paramExdate4, paramExdate5, paramLocation, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 : 수정된 값이 잘못되었습니다.</h1>');
               res.write('<a href="javascript:window.history.back();">돌아가기</a>');
               res.end();
               return ;
           }
            console.log('배달원 공고 날짜 수정 결과 DB 저장 완료.');
        });
});



StudentRouter.route('/process/Student_ApplyList').post(function(req, res) {
    console.log('/process/Student_ApplyList 라우팅 함수 호출됨.');
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var studentID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + studentID);
    
    
        Student.StudentApplyList(studentID, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_applyList.ejs', {data: rows, StudentID: studentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('지난 배달원 공고 신청 내역이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('student_applyList.ejs', {data: data, StudentID: studentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            }
        });
});


StudentRouter.route('/process/Student_PastApplyDetail').post(function(req, res) {
    console.log('/process/Student_PastApplyDetail 라우팅 함수 호출됨.');
    
    var paramTitle = req.body.title || req.query.title;
    
    console.log('요청 파라미터 : ' + paramTitle);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var studentID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + studentID);
    
    
        Student.PastApplyDetail(paramTitle, studentID, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_PastApplyDetail.ejs', {data: rows, StudentID: studentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('에러 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>지난 배달원 공고 신청 정보 조회 안됨.</h1>');
               res.end();
            }
        });
});



StudentRouter.route('/process/Student_CompleteSearch').post(function(req, res) {
    console.log('/process/Student_CompleteSearch 라우팅 함수 호출됨.');
    
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var studentID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + studentID);
    
    
        Student.StudentCompleteSearch(studentID, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('student_PastDeliveryCount.ejs', {data: rows}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            } else {
               console.log('지난 배달 결과 내역이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('student_PastDeliveryCount.ejs', {data: data, StudentID: studentID}, function(err, html) {
                   if (err) {
                       console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                       console.log('에러 발생.');
                       
                       res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                       res.write('<h1>뷰 렌더링 중 에러 발생</h1>');
                       res.write('<br><p>' + err.stack + '</p>');
                       res.end();
                       return;
                   } 
                   
                   res.end(html);
               });
            }
        });
});



module.exports = StudentRouter;