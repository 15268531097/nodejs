var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadImg', function(req, res) {    
    var form = new multiparty.Form();    //设置编码    
    form.encoding = 'utf-8';    //设置文件存储路径    
    form.uploadDir = './uploadtemp';    //设置文件大小限制   
    form.maxFilesSize = 2 * 1024 * 1024;   
    form.parse(req,function(err,fields,files){
      console.log(files);        
      var uploadurl = './images/upload/',
      file = files['filedata'],        
      originalFilename= file[0]. originalFilename, // 原始文件名        
      tmpPath = file[0].path;     
      //定义变量

      var timestamp = new Date().getTime();        
      uploadurl += timestamp + originalFilename;       
      newPath = './public/' + uploadurl;        
      var fileReadStream = fs.createReadStream(tmpPath);        
      var fileWriteStream = fs.createWriteStream(newPath);        
      fileReadStream.pipe(fileWriteStream); //管道流        
      fileWriteStream.on('close',function(){           
      fs.unlinkSync(tmpPath);            
      res.send('{"err":"","msg":"'+uploadurl+'"}');        
      });
    });
  });

module.exports = router;
