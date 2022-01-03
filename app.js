const http = require("http")
const server = http.createServer((req,res)=>{
    if (req.url === '/')
    {
        res.write("hello world ");
        res.end();
    }
if (req.url === '/api/course'){
res.write(JSON.stringify([1,2,4,5]));
res.end();
}    
console.log("new request");
});
server.listen(3000);
console.log("listening on port 3000")