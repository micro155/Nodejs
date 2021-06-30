var express = require('../node_modules/express');
var multer = require('multer');
var cors = require('cors');
var path = require('path');
var cookie = require('../node_modules/cookie');


var ManagerRouter = express.Router();
var Manager = require('../database/Manager_loader');

var app = express();


app.use('/', ManagerRouter);
app.use(cors());

app.set('view engine', 'ejs');



ManagerRouter.route('/process/Manager_Main').post(function(req, res) {
    console.log('/process/Manager_Main 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    res.cookie('LoginID', paramId);

    
        Manager.ManagerMain(function(err, rows) {
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
            } else {
               console.log('에러 발생.');
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


ManagerRouter.route('/process/MakerNotice').post(function(req, res) {
    console.log('/process/MakerNotice 라우팅 함수 호출됨.');
    
    var paramTitle = req.body.title || req.query.title
    var paramStartYear = req.body.startYear || req.query.startYear;
    var paramStartMonth = req.body.startMonth || req.query.startMonth;
    var paramStartDay = req.body.startDay || req.query.startDay;
    var paramEndYear = req.body.endYear || req.query.endYear;
    var paramEndMonth = req.body.endMonth || req.query.endMonth;
    var paramEndDay = req.body.endDay || req.query.endDay;
    var paramNum = req.body.num || req.query.num;
    
    var paramContext = req.body.context || req.query.context;
    
    console.log('요청 파라미터 : ' + paramTitle + ', ' + paramContext + ', ' + paramStartYear + ', ' + paramStartMonth + ', ' + paramStartDay + ', ' + paramEndYear + ', ' + paramEndMonth + ', ' + paramEndDay + ', ' + paramNum);
    
    
        Manager.SaveMakerNotice(paramStartYear, paramStartMonth, paramStartDay, paramEndYear, paramEndMonth, paramEndDay, paramTitle, paramContext, paramNum, function(err) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>게시글 업로드를 실패하였습니다.</h1>');
               res.end();
               return ;
           }
            console.log('업체 공고 내용 DB 저장 완료.');
        });
});


ManagerRouter.route('/process/StudentNotice').post(function(req, res) {
    console.log('/process/StudentNotice 라우팅 함수 호출됨.');
    
    var paramTitle = req.body.title || req.query.title
    var paramStartYear = req.body.startYear || req.query.startYear;
    var paramStartMonth = req.body.startMonth || req.query.startMonth;
    var paramStartDay = req.body.startDay || req.query.startDay;
    var paramEndYear = req.body.endYear || req.query.endYear;
    var paramEndMonth = req.body.endMonth || req.query.endMonth;
    var paramEndDay = req.body.endDay || req.query.endDay;
    
    var paramContext = req.body.context || req.query.context;
    
    console.log('요청 파라미터 : ' + paramTitle + ', ' + paramContext + ', ' + paramStartYear + ', ' + paramStartMonth + ', ' + paramStartDay + ', ' + paramEndYear + ', ' + paramEndMonth + ', ' + paramEndDay);
    
    
        Manager.SaveStudentNotice(paramStartYear, paramStartMonth, paramStartDay, paramEndYear, paramEndMonth, paramEndDay, paramTitle, paramContext, function(err) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>게시글 업로드를 실패하였습니다.</h1>');
               res.end();
               return ;
           }
            console.log('학생 공고 내용 DB 저장 완료.');
        });
});



ManagerRouter.route('/process/Manager_Allocation').post(function(req, res) {
    console.log('/process/Manager_Allocation 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.AllocationList(function(err, rows) {
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
                res.app.render('manager_delivery_allocation.ejs', {data: rows, ManagerID: managerID}, function(err, html) {
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
               console.log('계약한 업체 날짜 목록 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
                
               res.app.render('manager_delivery_allocation.ejs', {data: data, ManagerID: managerID}, function(err, html) {
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


ManagerRouter.route('/process/MakerValid').post(function(req, res) {
    console.log('/process/MakerValid 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    
    console.log('요청 파라미터 : ' + paramDate);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.FindMaker(paramDate, function(err, rows) {
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
                res.app.render('manager_delivery_allocation_2.ejs', {data: rows, origin: paramDate, ManagerID: managerID}, function(err, html) {
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
               console.log('계약한 업체 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
                
               res.app.render('manager_delivery_allocation_2.ejs', {data: data, origin: paramDate, ManagerID: managerID}, function(err, html) {
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





ManagerRouter.route('/process/AllocationPage').post(function(req, res) {
    console.log('/process/AllocationPage 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramDate + ', ' + paramName);
    
    
        Manager.AllocationPage(paramName, paramDate, function(err, rows) {
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
                
                console.dir(paramDate);
                res.app.render('manager_student_allocation.ejs', {data: rows, origin: paramDate, MakerName: paramName}, function(err, html) {
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
                
               var data;
                
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                console.dir(paramDate);
               res.app.render('manager_student_allocation.ejs', {data: data, origin: paramDate, MakerName: paramName, address: paramAddress}, function(err, html) {
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



ManagerRouter.route('/process/StudentAllocationValid').post(function(req, res) {
    console.log('/process/StudentAllocationValid 라우팅 함수 호출됨.');
    

    var paramDate = req.body.date || req.query.date;
    var paramMaker = req.body.makername || req.query.makername;
    
    console.log('요청 파라미터 : ' + paramDate + ', ' + paramMaker);
    
    
        Manager.StudentAllocationValid(paramDate, function(err, rows) {
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
                res.app.render('manager_student_allocation_2.ejs', {data: rows, origin: paramDate, MakerName: paramMaker}, function(err, html) {
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
               res.write('<h1>해당 날짜에 지원한 나머지 배달원 조회 안됨.</h1>');
               res.end();
            }
        });
});


ManagerRouter.route('/process/Allocation').post(function(req, res) {
    console.log('/process/Allocation 라우팅 함수 호출됨.');
    
    var paramName = req.body.name || req.query.name;
    var paramDate = req.body.date || req.query.date;
    
    
    console.log('요청 파라미터 : ' + paramName + ', ' + paramDate);
    
    
        Manager.Allocation(paramName, paramDate, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            console.log('배정 및 DB 저장 완료.');
            
        });
});


ManagerRouter.route('/process/Manager_CertValidFirst').post(function(req, res) {
    console.log('/process/Manager_CertValidFirst 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    res.cookie('LoginID', paramId);
    
        Manager.CertValidFirst(function(err, rows) {
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
                res.app.render('manager_check_deliver.ejs', {data: rows, ManagerID: paramId}, function(err, html) {
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
               console.log('배정된 배달 날짜 조회 안됨.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_check_deliver.ejs', {data: data, ManagerID: paramId}, function(err, html) {
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


ManagerRouter.route('/process/StudentCertList').post(function(req, res) {
    console.log('/process/StudentCertList 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    console.log('요청 파라미터 : ' + paramDate);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.StudentCertList(paramDate, function(err, rows) {
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
                res.app.render('manager_check_deliver_2.ejs', {data: rows, origin: paramDate, ManagerID: managerID}, function(err, html) {
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
               console.log('배정된 배달원 찾지 못함.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
                
               res.app.render('manager_check_deliver_2.ejs', {data: data, origin: paramDate, ManagerID: managerID}, function(err, html) {
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


ManagerRouter.route('/process/CertDeliveryValid').post(function(req, res) {
    console.log('/process/CertDeliveryValid 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    var paramName = req.body.name || req.query.name;
    var paramPhone = req.body.phone || req.query.phone;
    
    console.log('요청 파라미터 : ' + paramName + ', ' + paramDate);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.CertDeliveryValid(paramName, function(err, rows) {
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
                res.app.render('manager_check_deliver_3.ejs', {data: rows, origin: paramDate, phone: paramPhone, name: paramName, ManagerID: managerID}, function(err, html) {
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
               console.log('배달 완료한 내역 찾지 못함.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
                
               res.app.render('manager_check_deliver_3.ejs', {data: data, origin: paramDate, phone: paramPhone, name: paramName, ManagerID: managerID}, function(err, html) {
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


ManagerRouter.route('/process/CertDetail').post(function(req, res) {
    console.log('/process/CertDetail 라우팅 함수 호출됨.');
    
    var paramAddress = req.body.address || req.query.address;
    var paramName = req.body.name || req.query.name;
    var paramDate = req.body.date || req.query.date;
    var paramCount = req.body.count || req.query.count;
    var paramState = req.body.state || req.query.state;
    
    console.log('요청 파라미터 : ' + paramName + ', ' + paramDate + ', ' + paramAddress + ', ' + paramCount + ', ' + paramState);
    
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.CertDetail(paramName, paramDate, paramAddress, function(err, rows) {
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
                res.app.render('manager_check_deliver_4.ejs', {data: rows, origin: paramDate, name: paramName, count: paramCount, state: paramState, address: paramAddress, ManagerID: managerID}, function(err, html) {
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
               res.write('<h1>인증 상세 내역 불러오기 중 예기치 못한 에러 발생</h1>');
               res.end();
            }
        });
});


ManagerRouter.route('/process/ChangeDeliveryState').post(function(req, res) {
    console.log('/process/ChangeDeliveryState 라우팅 함수 호출됨.');
    
    var paramSName = req.body.sname || req.query.sname;
    var paramName = req.body.name || req.query.name;
    var paramState = req.body.state || req.query.state;
    var paramDate = req.body.date || req.query.date;
    var paramCount = req.body.count || req.query.count;
    var paramAddress = req.body.address || req.query.address;
    
    console.log('요청 파라미터 : ' + paramSName + ', ' + paramName + ', ' + paramState + ', ' + paramDate + ', ' + paramAddress);
    
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.ChangeDeliveryState(paramSName, paramAddress, paramState, paramDate, function(err, rows) {
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
                res.app.render('manager_check_deliver_4.ejs', {data: rows, origin: paramDate, name: paramSName, count: paramCount, state: paramState, address: paramAddress, ManagerID: managerID}, function(err, html) {
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
               res.write('<h1>인증 상세 내역 불러오기 중 예기치 못한 에러 발생</h1>');
               res.end();
            }
        });
});


ManagerRouter.route('/process/Manager_MakerContract').post(function(req, res) {
    console.log('/process/Manager_MakerContract 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    res.cookie('LoginID', paramId);
    
    
        Manager.ContractDatelist(function(err, rows) {
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
                res.app.render('manager_contract_maker.ejs', {data: rows, ManagerID: paramId}, function(err, html) {
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
               console.log('계약 날짜 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               
               var data;
                
               res.app.render('manager_contract_maker.ejs', {data: data, ManagerID: paramId}, function(err, html) {
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



ManagerRouter.route('/process/MakerMakeList').post(function(req, res) {
    console.log('/process/MakerMakeList 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    console.log('요청 파라미터 : ' + paramDate);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.MakerMakeList(paramDate, function(err, rows) {
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
                res.app.render('manager_contract_maker_2.ejs', {data: rows, origin: paramDate, ManagerID: managerID}, function(err, html) {
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
               console.log('해당 날짜에 계약한 업체가 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_contract_maker_2.ejs', {data: data, origin: paramDate, ManagerID: managerID}, function(err, html) {
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



ManagerRouter.route('/process/ContractDetail').post(function(req, res) {
    console.log('/process/ContractDetail 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    var paramName = req.body.name || req.query.name;
    var paramPhone = req.body.phone || req.query.phone;
    
    console.log('요청 파라미터 : ' + paramDate + ', ' + paramName);
    
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.ContractDetail(paramDate, paramName, function(err, rows) {
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
                res.app.render('manager_contract_maker_3.ejs', {data: rows, origin: paramDate, name: paramName, phone: paramPhone, ManagerID: managerID}, function(err, html) {
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
               console.log('납품 계약 정보가 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               
               var data;
                
               res.app.render('manager_contract_maker_3.ejs', {data: data, origin: paramDate, name: paramName, phone: paramPhone, ManagerID: managerID}, function(err, html) {
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


ManagerRouter.route('/process/MakerValidLinkState').post(function(req, res) {
    console.log('/process/MakerValidLinkState 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    var paramName = req.body.name || req.query.name;
    var paramFoodnum = req.body.food || req.query.food;
    var paramState = req.body.state || req.query.state;
    
    console.log('요청 파라미터 : ' + paramDate + ', ' + paramName + ', ' + paramFoodnum + ', ' + paramState);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.MakerValidLinkState(paramDate, function(err, rows) {
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
                res.app.render('manager_contract_maker_4.ejs', {data: rows, origin: paramDate, name: paramName, food: paramFoodnum, state: paramState, ManagerID: managerID}, function(err, html) {
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
               console.log('납품 인증 링크가 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
                
               res.app.render('manager_contract_maker_4.ejs', {data: data, origin: paramDate, name: paramName, food: paramFoodnum, state: paramState, ManagerID: managerID}, function(err, html) {
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


ManagerRouter.route('/process/ChangeState').post(function(req, res) {
    console.log('/process/ChangeState 라우팅 함수 호출됨.');
    
    var paramDate = req.body.date || req.query.date;
    var paramFoodnum = req.body.food || req.query.food
    var paramState = req.body.state || req.query.state;
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramDate + ', ' + paramFoodnum + ', ' + paramState + ', ' + paramName);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.ChangeState(paramDate, paramState, paramName, function(err, rows) {
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
                res.app.render('manager_contract_maker_4.ejs', {data: rows, origin: paramDate, name: paramName, food: paramFoodnum, state: paramState, ManagerID: managerID}, function(err, html) {
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
               console.log('납품 인증 링크가 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
                
               res.app.render('manager_contract_maker_4.ejs', {data: data, origin: paramDate, name: paramName, food: paramFoodnum, state: paramState, ManagerID: managerID}, function(err, html) {
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


ManagerRouter.route('/process/Manager_ChildManage').post(function(req, res) {
    console.log('/process/Manager_ChildManage 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    
    
        Manager.ChildManagePage(function(err, rows) {
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
                res.app.render('manager_child_management.ejs', {data: rows, ManagerID: paramId}, function(err, html) {
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
               console.log('결식 아동 목록이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               
               var data;
               
               res.app.render('manager_child_management.ejs', {data: data, ManagerID: paramId}, function(err, html) {
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


ManagerRouter.route('/process/InsertNewChild').post(function(req, res) {
    console.log('/process/InsertNewChild 라우팅 함수 호출됨.');
    
    var paramId = req.body.cid || req.query.cid;
    var paramName = req.body.name || req.query.name;
    var paramPhone = req.body.phone || req.query.phone;
    var paramAddress = req.body.address || req.query.address;
    var paramEphone = req.body.ephone || req.query.ephone;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramName + ', ' + paramPhone + ', ' + paramAddress + ', ' + paramEphone);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.InsertNewChild(paramId, paramName, paramPhone, paramAddress, paramEphone, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
             else {
               console.log('결식 아동 추가 완료.');
            }
        });
});


ManagerRouter.route('/process/Manager_MakerList').post(function(req, res) {
    console.log('/process/Manager_MakerList 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    res.cookie('LoginID', paramId);
    
        Manager.MakerList(function(err, rows) {
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
                res.app.render('manager_maker_list.ejs', {data: rows, ManagerID: paramId}, function(err, html) {
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
               console.log('등록된 업체가 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_maker_list.ejs', {data: data, ManagerID: paramId}, function(err, html) {
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


ManagerRouter.route('/process/Manager_StudentList').post(function(req, res) {
    console.log('/process/Manager_StudentList 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    res.cookie('LoginID', paramId);
    
        Manager.StudentList(function(err, rows) {
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
                res.app.render('manager_student_list.ejs', {data: rows, ManagerID: paramId}, function(err, html) {
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
               console.log('등록된 배달원이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_student_list.ejs', {data: data, ManagerID: paramId}, function(err, html) {
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


ManagerRouter.route('/process/Manager_StudentNoShowList').post(function(req, res) {
    console.log('/process/Manager_StudentNoShowList 라우팅 함수 호출됨.');
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.StudentNoShow(function(err, rows) {
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
                res.app.render('manager_student_noshow.ejs', {data: rows, ManagerID: managerID}, function(err, html) {
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
               console.log('등록된 배달원이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_student_noshow.ejs', {data: data, ManagerID: managerID}, function(err, html) {
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



ManagerRouter.route('/process/Manager_StudentNoShowChange').post(function(req, res) {
    console.log('/process/Manager_StudentNoShowChange 라우팅 함수 호출됨.');
    
    var paramName = req.body.name || req.query.name;
    var paramCount = req.body.count || req.query.count;
    
    console.log('요청 파라미터 : ' + paramName + ', ' + paramCount);
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);
    
    
        Manager.NoShowChange(paramCount, paramName, function(err, rows) {
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
                res.app.render('manager_student_noshow.ejs', {data: rows, ManagerID: managerID}, function(err, html) {
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
               console.log('등록된 배달원이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_student_noshow.ejs', {data: data, ManagerID: managerID}, function(err, html) {
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


ManagerRouter.route('/process/Manager_ChildArrangementFirstPage').post(function(req, res) {
    console.log('/process/Manager_ChildArrangementFirstPage 라우팅 함수 호출됨.');
    
    var cookies = cookie.parse(req.headers.cookie);
    
    var managerID = cookies.LoginID;
    
    console.log('쿠키 ID 값 : ' + managerID);

    
        Manager.ChildArrangementFirstPage(function(err, rows) {
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
                res.app.render('manager_child_arrangement.ejs', {data: rows, ManagerID: managerID}, function(err, html) {
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
               console.log('급식일 배정받은 결식 아동이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_child_arrangement.ejs', {data: data, ManagerID: managerID}, function(err, html) {
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


ManagerRouter.route('/process/Manager_ChildArrangementSecondPage').post(function(req, res) {
    console.log('/process/Manager_ChildArrangementSecondPage 라우팅 함수 호출됨.');
    

    
        Manager.ChildArrangementSecondPage(function(err, rows) {
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
                res.app.render('manager_child_arrangement_2.ejs', {data: rows}, function(err, html) {
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
               console.log('급식일 배정받은 결식 아동이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_child_arrangement_2.ejs', {data: data}, function(err, html) {
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


ManagerRouter.route('/process/Manager_ChildArrangementThirdPage').post(function(req, res) {
    console.log('/process/Manager_ChildArrangementThirdPage 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramAddress = req.body.address || req.query.address;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramAddress);

    
        Manager.ChildArrangementThirdPage(function(err, rows) {
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
                res.app.render('manager_child_arrangement_3.ejs', {data: rows, child: paramId, child_address: paramAddress}, function(err, html) {
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
               console.log('배정 가능한 급식일이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_child_arrangement_3.ejs', {data: data, child: paramId, child_address: paramAddress}, function(err, html) {
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


ManagerRouter.route('/process/Manager_ChildArrangement').post(function(req, res) {
    console.log('/process/Manager_ChildArrangement 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramDate = req.body.date || req.query.date;
    var paramAddress = req.body.address || req.query.address;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramDate + ', ' + paramAddress);
    

    
        Manager.ChildArrangement(paramId, paramDate, paramAddress, function(err, rows) {
           if(err) {
               console.log('에러 발생 : ' + err);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           }
            
            console.log('결식 아동 급식일 배정 완료.'); 
        });
});


ManagerRouter.route('/process/Manager_mypage').post(function(req, res) {
    console.log('/process/Manager_mypage 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    console.log('요청 파라미터 : ' + paramId);
    
    res.cookie('LoginID', paramId);
    
    
        Manager.ManagerMypage(paramId, function(err, rows) {
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
                res.app.render('manager_mypage.ejs', {data: rows, ManagerID: paramId}, function(err, html) {
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


ManagerRouter.route('/process/Manager_mypage_change').post(function(req, res) {
    console.log('/process/Manager_mypage_change 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramPhone = req.body.phone || req.query.phone;
    
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramPhone);
    
        Manager.MypageChange(paramId, paramPassword, paramName, paramPhone, function(err, rows) {
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
                res.app.render('manager_mypage.ejs', {data: rows, ManagerID: paramId}, function(err, html) {
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


ManagerRouter.route('/process/Manager_MakerContractResult').post(function(req, res) {
    console.log('/process/Manager_MakerContractResult 라우팅 함수 호출됨.');

    
        Manager.MakerContractResult(function(err, rows) {
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
                res.app.render('manager_MakerContractsResult.ejs', {data: rows}, function(err, html) {
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
               console.log('업체 공고 결과가 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_MakerContractsResult.ejs', {data: data}, function(err, html) {
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


ManagerRouter.route('/process/Manager_StudentApplyResult').post(function(req, res) {
    console.log('/process/Manager_StudentApplyResult 라우팅 함수 호출됨.');

    
        Manager.StudentApplyResult(function(err, rows) {
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
                res.app.render('manager_StudentApplyResult.ejs', {data: rows}, function(err, html) {
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
               console.log('배정 가능한 급식일이 존재하지 않음.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
               var data;
               
               res.app.render('manager_StudentApplyResult.ejs', {data: data}, function(err, html) {
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



module.exports = ManagerRouter;