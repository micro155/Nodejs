var express = require('../node_modules/express');

var findRouter = express.Router();

var app = express();
var findQuery = require('../database/find_loader');


app.use('/', findRouter);

app.set('view engine', 'ejs');




findRouter.route('/process/Child_location').post(function(req, res) {
    console.log('/process/Child_location 라우팅 함수 호출됨.');
    
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramName);
    
        findQuery.ChildLocation(paramName, function(err, rows) {
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
                
                
                res.app.render('map(child).ejs', {data: rows}, function(err, html) {
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


findRouter.route('/process/Maker_location').post(function(req, res) {
    console.log('/process/Maker_location 라우팅 함수 호출됨.');
    
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramName);
    
        findQuery.MakerLocation(paramName, function(err, rows) {
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
                
                
                res.app.render('map(maker).ejs', {data: rows}, function(err, html) {
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


findRouter.route('/process/Student_location').post(function(req, res) {
    console.log('/process/Student_location 라우팅 함수 호출됨.');
    
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramName);
    
    
    findQuery.StudentLocation(paramName, function(err, rows) {
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
                
                
                res.app.render('map(student).ejs', {data: rows}, function(err, html) {
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



module.exports = findRouter;