var url = require('url');

var urlStr = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=bracket.io+%EC%82%AD%EC%A0%9C&oquery=bracket.io+%ED%85%8C%EC%8A%A4%ED%8A%B8+%ED%95%AD%EB%AA%A9+%EC%82%AD%EC%A0%9C&tqi=UHQfusp0Jy0ss4D7RWKssssssiR-251675';

var curUrl = url.parse(urlStr);
console.dir(curUrl);

console.log('query -> ' + curUrl.query);

var curStr = url.format(curUrl);
console.log('url -> ' + curStr);

var querystring = require('querystring');
var params = querystring.parse(curUrl.query);
console.log('검색어 : ' + params.query);