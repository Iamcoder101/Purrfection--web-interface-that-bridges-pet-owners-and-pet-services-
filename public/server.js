//server creation 
// 1. http module
const { log } =require('console');
const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    console.log('request has been made from browser to server');
   // console.log(req.method);
    //console.log(req.url);
   res.setHeader('Content-Type','text/html');
  //  res.write('<h1>ayesha</h1>');
  //  res.write('<h2><em>iam good<em></h2>')
  //  res.end();
  fs.readFile('./home_3.html',(err,fileData)=>{
if(err){
    console.log('error');
}
else{
    res.write(fileData);
    res.end();
}
  })

});
//port number host call back func
server.listen(3000,'localhost',()=>{
    console.log('server is listening on port 3000');
});