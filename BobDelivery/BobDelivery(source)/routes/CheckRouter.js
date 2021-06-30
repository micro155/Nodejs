var express = require('../node_modules/express');
var CheckRouter = express.Router();

var app = express();
var CheckID = require('../database/checkID_loader');


app.use('/', CheckRouter);

app.set('view engine', 'ejs');

CheckRouter.route('/process/CheckStudent').post(function(req, res) {
    console.log('/process/CheckStudent 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    console.log('요청 파라미터 : ' + paramId);
    
        CheckID.CheckStudent(paramId, function(err, rows) {
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
                
                var data = {
                    cid: rows[0].id,
                    id: paramId
                };
                
                res.app.render('CheckID.ejs', {data: data}, function(err, html) {
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
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
                var data = {
                    cid: null,
                    id: paramId
                };
                
                res.app.render('CheckID.ejs', {data: data}, function(err, html) {
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


CheckRouter.route('/process/CheckMaker').post(function(req, res) {
    console.log('/process/CheckMaker 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    console.log('요청 파라미터 : ' + paramId);
    
        CheckID.CheckMaker(paramId, function(err, rows) {
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
                
                var data = {
                    cid: rows[0].id,
                    id: paramId
                };
                
                res.app.render('CheckID.ejs', {data: data}, function(err, html) {
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
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
                var data = {
                    cid: null,
                    id: paramId
                };
                
                res.app.render('CheckID.ejs', {data: data}, function(err, html) {
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


CheckRouter.route('/process/CheckManager').post(function(req, res) {
    console.log('/process/CheckManager 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    
    console.log('요청 파라미터 : ' + paramId);
    
        CheckID.CheckManager(paramId, function(err, rows) {
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
                
                var data = {
                    cid: rows[0].id,
                    id: paramId
                };
                
                res.app.render('CheckID.ejs', {data: data}, function(err, html) {
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
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
                
                var data = {
                    cid: null,
                    id: paramId
                };
                
                res.app.render('CheckID.ejs', {data: data}, function(err, html) {
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

module.exports = CheckRouter;