
const http = require("http");
const fs = require("fs");
const path = require("path");
const Config = require("./config")

const server = http.createServer();
server.on("request", (req, res) => {
   let url = req.url;
   readStaticFile(url,res)
})
// 4.启动服务器
server.listen(3001,() => {  // 默认为localhost（本地主机）; 端口为3000
   console.log("server is running 127.0.0.1:3001")
})

function readStaticFile(url, res) {

   fs.readFile(path.join(__dirname, Config.rootDir, url), (err, data) => {
       if (err) return res.end("404");
       res.end(data)
   }) 
}