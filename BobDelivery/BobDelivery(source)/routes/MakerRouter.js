var express = require('../node_modules/express');
var multer = require('multer');
var cors = require('cors');
var path = require('path');
var cookie = require('../node_modules/cookie');


var MakerRouter = express.Router();
var Maker = require('../database/Maker_loader');

var app = express();


app.use('/', MakerRouter);
app.use(cors());

app.set('view engine', 'ejs');



MakerRouter.route('/process/Maker_Main').post(function(req, res) {
    console.log('/process/Maker_Main 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    res.cookie('LoginID', paramId);
    
        Maker.MakerMain(paramId, function(err, rows) {
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
                res.app.render('maker_main.ejs', {data: rows, MakerID: paramId}, function(err, html) {
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
                
               res.app.render('maker_main.ejs', {data: data, MakerID: paramId}, function(err, html) {
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


MakerRouter.route('/process/Maker_FindStudent').post(function(req, res) {
    console.log('/process/Maker_FindStudent 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    
        Maker.FindStudent(paramId, function(err, rows) {
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
                res.app.render('maker_ValidStudent.ejs', {data: rows, MakerID: paramId}, function(err, html) {
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
               
               res.app.render('maker_ValidStudent.ejs', {data: data, MakerID: paramId}, function(err, html) {
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


MakerRouter.route('/process/Maker_Studentlist').post(function(req, res) {
    console.log('/process/Maker_Studentlist 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    console.log('요청 파라미터 : ' + paramDate);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var makerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + makerID);
    
    
        Maker.Studentlist(makerID, paramDate, function(err, rows) {
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
                res.app.render('maker_ValidStudent_2.ejs', {data: rows, origin: paramDate, MakerID: makerID}, function(err, html) {
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
               
               res.app.render('maker_ValidStudent_2.ejs', {data: data, origin: paramDate, MakerID: makerID}, function(err, html) {
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


MakerRouter.route('/process/Maker_ValidPage').post(function(req, res) {
    console.log('/process/Maker_ValidPage 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    
        Maker.MakerCert(paramId, function(err, rows) {
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
                res.app.render('maker_complete_food.ejs', {data: rows, MakerID: paramId}, function(err, html) {
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
                
               res.app.render('maker_complete_food.ejs', {data: data, MakerID: paramId}, function(err, html) {
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

MakerRouter.route('/process/Maker_ImageUpload').post(upload.array('photo',1), function(req, res) {
    console.log('/process/Maker_ImageUpload 라우팅 함수 호출됨.');
    
    var paramMakerID = req.body.MakerID || req.query.MakerID;
    var paramYear = req.body.year || req.query.year;
    var paramMonth = req.body.month || req.query.month;
    var paramDay = req.body.day || req.query.day;
    
    var paramDate = paramYear + '-' + paramMonth + '-' + paramDay;
    
    console.log('요청 파라미터 : ' + paramMakerID + ', ' + paramDate);
    
    
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
    
    
    Maker.MakerUpload(paramMakerID, paramlink, paramDate, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows) {
            console.dir(rows);
                
            res.app.render('maker_complete_food.ejs', {data: rows, MakerID: paramMakerID}, function(err, html) {
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


MakerRouter.route('/process/Maker_mypage').post(function(req, res) {
    console.log('/process/Maker_mypage 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    
        Maker.MakerMypage(paramId, function(err, rows) {
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
                res.app.render('maker_mypage.ejs', {data: rows, MakerID: paramId}, function(err, html) {
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
               res.write('<h1>사용자 데이터 조회 안됨.</h1>');
               res.end();
            }
        });
});


MakerRouter.route('/process/Maker_mypage_change').post(function(req, res) {
    console.log('/process/Maker_mypage_change 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramPhone = req.body.phone || req.query.phone;
    var paramAddress1 = req.body.address1 || req.query.address1;
    var paramAddress2 = req.body.address2 || req.query.address2;
    var paramBank = req.body.bank || req.query.bank;
    var paramAccount = req.body.account_num || req.query.account_num;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramPhone + ', ' + paramAddress1 + ', ' + paramAddress2 + ', ' + paramBank + ', ' + paramAccount);
    
    
        Maker.MypageChange(paramId, paramPassword, paramPhone, paramAddress1, paramAddress2, paramBank, paramAccount, function(err, rows) {
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
                res.app.render('maker_mypage.ejs', {data: rows, MakerID: paramId}, function(err, html) {
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
               res.write('<h1>사용자 데이터 조회 안됨.</h1>');
               res.end();
            }
        });
});



MakerRouter.route('/process/Maker_ApplyPage').post(function(req, res) {
    console.log('/process/Maker_ApplyPage 라우팅 함수 호출됨.');
    
    var paramTitle = req.body.title || req.query.title;
    
    console.log('요청 파라미터 : ' + paramTitle);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var makerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + makerID);
    
    
        Maker.MakerApplyPage(paramTitle, function(err, rows) {
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
                res.app.render('maker_apply.ejs', {data: rows, MakerID: makerID}, function(err, html) {
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
               res.write('<h1>진행 중인 업체 공고 정보 조회 안됨.</h1>');
               res.end();
            }
        });
});



MakerRouter.route('/process/Maker_ApplySubmit').post(function(req, res) {
    console.log('/process/Maker_ApplySubmit 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramDate1 = req.body.date1 || req.query.date1;
    var paramDate2 = req.body.date2 || req.query.date2;
    var paramDate3 = req.body.date3 || req.query.date3;
    var paramDate4 = req.body.date4 || req.query.date4;
    var paramDate5 = req.body.date5 || req.query.date5;
    var paramNum = req.body.num || req.query.num;
    var paramType = req.body.type || req.query.type;
    
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramDate1 + ', ' + paramDate2 + ', ' + paramDate3 + ', ' + paramDate4 + ', ' + paramDate5 + ', ' + paramNum + ', ' + paramType);
    
    
        Maker.MakerApplySubmit(paramId, paramDate1, paramDate2, paramDate3, paramDate4, paramDate5, paramNum, paramType, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 : 입력된 값이 잘못되었습니다.</h1>');
               res.write('<a href="javascript:window.history.back();">돌아가기</a>');
               res.end();
               return ;
           }
            console.log('업체 공고 신청 DB 저장 완료.');
        });
});



MakerRouter.route('/process/Maker_ApplyValid').post(function(req, res) {
    console.log('/process/Maker_ApplyValid 라우팅 함수 호출됨.');
    
    var paramTitle = req.body.title || req.query.title;
    
    console.log('요청 파라미터 : ' + paramTitle);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var makerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + makerID);
    
    
        Maker.MakerApplyValid(paramTitle, makerID, function(err, rows) {
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
                res.app.render('maker_apply.ejs', {data: rows, MakerID: makerID}, function(err, html) {
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
               res.write('<h1>신청한 업체 공고 정보 조회 안됨.</h1>');
               res.end();
            }
        });
});


MakerRouter.route('/process/Maker_ApplyChange').post(function(req, res) {
    console.log('/process/Maker_ApplyChange 라우팅 함수 호출됨.');
    
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
    
    var paramType = req.body.type || req.query.type;
    var paramNum = req.body.num || req.query.num;
    
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramDate1 + ', ' + paramDate2 + ', ' + paramDate3 + ', ' + paramDate4 + ', ' + paramDate5 + ', ' + paramExdate1 + ', ' + paramExdate2 + ', ' + paramExdate3 + ', ' + paramExdate4 + ', ' + paramExdate5 + ', ' + paramNum + ', ' + paramType);
    
    
        Maker.MakerApplyChange(paramId, paramDate1, paramDate2, paramDate3, paramDate4, paramDate5, paramExdate1, paramExdate2, paramExdate3, paramExdate4, paramExdate5, paramNum, paramType, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 : 수정된 값이 잘못되었습니다.</h1>');
               res.write('<a href="javascript:window.history.back();">돌아가기</a>');
               res.end();
               return ;
           }
            console.log('업체 공고 신청 날짜 수정 결과 DB 저장 완료.');
        });
});



MakerRouter.route('/process/Maker_ApplyList').post(function(req, res) {
    console.log('/process/Maker_ApplyList 라우팅 함수 호출됨.');
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var makerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + makerID);
    
    
        Maker.MakerApplyList(makerID, function(err, rows) {
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
                res.app.render('maker_applyList.ejs', {data: rows, MakerID: makerID}, function(err, html) {
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
               console.log('지난 업체 공고 신청 내역이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('maker_applyList.ejs', {data: data, MakerID: makerID}, function(err, html) {
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


MakerRouter.route('/process/Maker_PastApplyDetail').post(function(req, res) {
    console.log('/process/Maker_PastApplyDetail 라우팅 함수 호출됨.');
    
    var paramTitle = req.body.title || req.query.title;
    
    console.log('요청 파라미터 : ' + paramTitle);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var makerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + makerID);
    
    
        Maker.PastApplyDetail(paramTitle, makerID, function(err, rows) {
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
                res.app.render('maker_PastApplyDetail.ejs', {data: rows, MakerID: makerID}, function(err, html) {
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
               res.write('<h1>지난 업체 공고 신청 정보 조회 안됨.</h1>');
               res.end();
            }
        });
});



MakerRouter.route('/process/Maker_CompleteSearch').post(function(req, res) {
    console.log('/process/Maker_CompleteSearch 라우팅 함수 호출됨.');
    
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var makerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + makerID);
    
    
        Maker.MakerCompleteSearch(makerID, function(err, rows) {
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
                res.app.render('maker_PastContractsCount.ejs', {data: rows}, function(err, html) {
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
               console.log('지난 계약 및 납품 결과 내역이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('maker_PastContractsCount.ejs', {data: data}, function(err, html) {
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


MakerRouter.route('/process/Maker_ContractsResult').post(function(req, res) {
    console.log('/process/Maker_ContractsResult 라우팅 함수 호출됨.');
    
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var makerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + makerID);
    
    
        Maker.ContractsResult(makerID, function(err, rows) {
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
                res.app.render('maker_ContractsResult.ejs', {data: rows}, function(err, html) {
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
               console.log('지난 계약 및 납품 결과 내역이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('maker_ContractsResult.ejs', {data: data}, function(err, html) {
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


module.exports = MakerRouter;