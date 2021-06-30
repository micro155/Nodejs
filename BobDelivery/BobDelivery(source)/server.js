var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var fs = require('fs');
var socketio = require('socket.io');
var connect = require('connect');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var expressErrorHandler = require('express-error-handler');


var app = express();


app.set('port', process.env.PORT || 8080);
app.use('/public', static(path.join(__dirname, 'public')));

app.use('/', express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized:true
}));



app.get( '/', function ( req, res) {
	fs.readFile('index.html','utf8', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
     });
});



var FunctionRouter = require('./routes/router.js');
app.use(FunctionRouter);

var FindRouter = require('./routes/findRouter.js');
app.use(FindRouter);


var CheckRouter = require('./routes/CheckRouter.js');
app.use(CheckRouter);


var MakerRouter = require('./routes/MakerRouter.js');
app.use(MakerRouter);

var StudentRouter = require('./routes/StudentRouter.js');
app.use(StudentRouter);

var ManagerRouter = require('./routes/ManagerRouter.js');
app.use(ManagerRouter);


var errorHandler = expressErrorHandler({
    static: {
        '404' : './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});