var express = require('../node_modules/express');
var router = express.Router();
var passport = require('../node_modules/passport');

var app = express();
var database = require('../database/login&register_loader');


app.use('/', router);

app.set('view engine', 'ejs');


router.route('/process/addStudent').post(function(req, res) {
    console.log('/process/addStudent 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramPhone = req.body.phone || req.query.phone;
    var paramAddress1 = req.body.address1 || req.query.address1;
    var paramAddress2 = req.body.address2 || req.query.address2;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramPhone + ', ' + paramAddress1 + ', ' +
               paramAddress2);
    
    
    database.addStudent(paramId, paramName, paramPhone, paramPassword, paramAddress1, paramAddress2, function(err, addedStudent) {
        if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
        }
        if(addedStudent) {
            console.dir(addedStudent);
            res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
            res.write('<h1>회원가입이 완료되었습니다.</h1>');
            res.write('<a href="../../">로그인 화면으로</a>');
            res.end();
        } else {
            console.log('에러 발생.');
            res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
            res.write('<h1>오류로 인해 회원가입이 완료되지 않았습니다.</h1>');
            res.end();
        }
        
    });
});


router.route('/process/addMaker').post(function(req, res) {
    console.log('/process/addMaker 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramPhone = req.body.phone || req.query.phone;
    var paramAddress1 = req.body.address1 || req.query.address1;
    var paramAddress2 = req.body.address2 || req.query.address2;
    var paramBank = req.body.bank || req.query.bank;
    var paramBuisness_reg_num = req.body.buisness_reg_num || req.query.buisness_reg_num;
    var paramAccount_num = req.body.account_num || req.query.account_num;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramPhone + ', ' + paramName + ', ' + paramAddress1 + ', ' + paramAddress2 + ', ' + paramBank + ', ' + paramBuisness_reg_num + ', ' + paramAccount_num);

    
    database.addMaker(paramId, paramName, paramPassword, paramPhone, paramAddress1, paramAddress2, paramBank, paramBuisness_reg_num, paramAccount_num, function(err, addedMaker) {
        if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
        }
        if(addedMaker) {
            console.dir(addedMaker);
            res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
            res.write('<h1>회원가입이 완료되었습니다.</h1>');
            res.write('<a href="../../">로그인 화면으로</a>');
            res.end();
        } else {
            console.log('에러 발생.');
            res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
            res.write('<h1>오류로 인해 회원가입이 완료되지 않았습니다.</h1>');
            res.end();
        }
        
    });
});


router.route('/process/addManager').post(function(req, res) {
    console.log('/process/addManager 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramMName = req.body.manager_name || req.query.manager_name;
    var paramMPName = req.body.manage_person_name || req.query.manage_person_name;
    var paramMPphone = req.body.manage_person_phone || req.query.manage_person_phone;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramMName + ', ' + paramMPName + ', ' + paramMPphone);
    
    
    database.addManager(paramId, paramPassword, paramMName, paramMPName, paramMPphone, function(err, addedManager) {
        if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
        }
        if(addedManager) {
            console.dir(addedManager);
            res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
            res.write('<h1>회원가입이 완료되었습니다.</h1>');
            res.write('<a href="../../">로그인 화면으로</a>');
            res.end();
        } else {
            console.log('에러 발생.');
            res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
            res.write('<h1>오류로 인해 회원가입이 완료되지 않았습니다.</h1>');
            res.end();
        }
        
    });
});


router.route('/process/Student_login').post(function(req, res) {
    console.log('/process/Student_login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    res.cookie('LoginID', paramId);
    
    
        database.authStudents(paramId, paramPassword, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows != 'O' && rows != 'X') {
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
            } else if (rows == 'X') {
               console.log('유효한 아이디가 없음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>가입된 사용자 없음.</h1>');
               res.write('<a href="/">돌아가기</a>');
               res.end(); 
            } else if (rows == 'O') {
                console.log('비밀번호 불일치.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>비밀번호가 일치하지 않습니다.</h1>');
               res.write('<a href="/">돌아가기</a>');
               res.end(); 
            } else {
               console.log('모집 중인 공고 없음.');
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


router.route('/process/Maker_login').post(function(req, res) {
    console.log('/process/Maker_login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    res.cookie('LoginID', paramId);
    
    
        database.authMakers(paramId, paramPassword, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows != 'O' && rows != 'X') {
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
            } else if (rows == 'X') {
               console.log('유효한 아이디가 없음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>가입된 사용자 없음.</h1>');
               res.write('<a href="/">돌아가기</a>');
               res.end(); 
            } else if (rows == 'O') {
                console.log('비밀번호 불일치.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>비밀번호가 일치하지 않습니다.</h1>');
               res.write('<a href="/">돌아가기</a>');
               res.end(); 
            } else {
               console.log('모집 중인 공고 없음.');
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


router.route('/process/Manager_login').post(function(req, res) {
    console.log('/process/Manager_login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    res.cookie('LoginID', paramId);
    
        database.authManagers(paramId, paramPassword, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            if(rows != 'O' && rows != 'X') {
                console.dir(rows);
                
                
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                res.app.render('manager_main.ejs', {data: rows, ManagerID: paramId}, function(err, html) {
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
            } else if (rows == 'X') {
               console.log('유효한 아이디가 없음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>가입된 사용자 없음.</h1>');
               res.write('<a href="/">돌아가기</a>');
               res.end(); 
            } else if (rows == 'O') {
               console.log('비밀번호 불일치.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>비밀번호가 일치하지 않습니다.</h1>');
               res.write('<a href="/">돌아가기</a>');
               res.end();
            } else {
               console.log('진행 중인 공고 없음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
                
               res.app.render('manager_main.ejs', {data: data, ManagerID: paramId}, function(err, html) {
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


router.route('/process/logout').post(function (req, res) {
        console.log('/process/loginout 라우팅 함수 호출됨'); 
        
            console.log('로그아웃 처리');
            req.logout();
            req.session.destroy(
                function (err) {
                    if (err) {
                        console.log('세션 삭제시 에러');
                        return;
                    }
                    console.log('세션 삭제 성공');
                    res.clearCookie('LoginID');
                    res.redirect('/');
        }); 
});



module.exports = router;