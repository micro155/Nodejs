var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var expressErrorHandler = require('express-error-handler');

var mysql = require('mysql');

var pool = mysql.createPool({
    connecitonLimit: 10,
    host:'localhost',
    user:'root',
    password:'al!1zmfh12',
    database:'practice',
    debug:false
});

var app = express();


app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized:true
}));


var router = express.Router();


app.use('/', router);

var authUser = function(db, id, password, callback) {
    console.log('authUser 호출됨 : ' + id + ', ' + password);
    
    var users = db.collection('users');
    
    users.find({"id" : id, "password" : password}).toArray(function(err, docs) {
        if(err) {
            callback(err, null);
            return;
        }
        if(docs.length > 0) {
            console.log('일치하는 사용자를 찾음.');
            callback(null, docs);
        } else {
            console.log('일치하는 사용자를 찾지 못함');
            callback(null, null);
        }
    });
};


router.route('/process/login').post(function(req, res) {
    console.log('/process/login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    if(database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
           if(err) {
               console.log('에러 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>에러 발생</h1>');
               res.end();
               return ;
           } 
            
            if(docs) {
                console.dir(docs);
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>사용자 로그인 성공</h1>');
                res.write('<div><p>사용자 : ' + docs[0].name + '</p></div>');
                res.write('<br><br><a href="/public/login.html">다시 로그인하기</a>');
               res.end();
            } else {
                console.log('에러 발생.');
               res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
               res.write('<h1>사용자 데이터 조회 안됨.</h1>');
               res.end();
            }
        });
    } else {
            console.log('에러 발생.');
           res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
           res.write('<h1>데이터베이스 연결 안됨.</h1>');
           res.end();
    }
});


var authUser = function(db, id, password, callback) {
    console.log('authUser 호출됨 : ' + id + ', ' + password);
    
    var users = db.collection('users');
    
    users.find({"id":id, "password":password}).toArray(function(err, docs){
        if(err) {
            callback(err, null);
            return;
        }
        
        if(docs.length > 0) {
            console.log('일치하는 사용자를 찾음.');
            callback(null, docs);
        } else {
            console.log('일치하는 사용자를 찾지 못함.');
            callback(null, null);
        }
    });
};


var errorHandler = expressErrorHandler({
    static: {
        '404' : './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
    connectDB();
});