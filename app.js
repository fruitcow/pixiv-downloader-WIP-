  var request = require("request");
  var fs = require("fs");
  var cheerio = require("cheerio");
  var url = require('url');
  var base ="http://i4.pixiv.net/img-original/img/";
  var mkdirp = require('mkdirp');
  var dir = './images';
  
  
 mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});
var id = 'erty88860';
var password = 'asdf777';
var options = {
  url : 'https://touch.secure.pixiv.net/login.php',
  form: {
    mode: 'login',
    query: 'guid=on',
    pixiv_id: id,
    pass: password,
    referer_uri: ''
  }
};
request.post(options, function(err, res, body) {
  if (err) return console.error(err);
  console.log("Login OK")
  var session = '&' + res.headers['set-cookie'][0].match(/PHPSESSID=\w+/)[0];
   
  
  
});



  request({
    url: "http://www.pixiv.net/search.php?s_mode=s_tag&word=%E5%AD%B8%E5%9C%92%E5%AD%A4%E5%B3%B6",
    method: "GET"
  }, function(err,req,body) {
    if(err || !body) { return; }
    var $ = cheerio.load(body);
    var result = [];
	var links = $("._thumbnail");
	

    //var titles = link.attr('href');
    for( i=0;i<links.length;i++) {
	
	  var o =$(links[i]).attr('src');
	  var b =o.split("/img/")[1].toString();
	  var y =b.split("_master")[0].toString();
	  
      result.push(base+y+".jpg");
	  
	  var s=base+y+".jpg";
	  console.log(s);
	  download(s, dir, Math.floor(Math.random()*100000) + s.substr(-4,4));
       
    }
    fs.writeFileSync("result.json", JSON.stringify(result));
  });
 */
  
  var download = function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};
  