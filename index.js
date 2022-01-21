const httpClient = require('http');
const host = 'localhost';
const port = 8080;
const Batiments = require('./Batiments')
const requestListener = function (req,res){
    if (req.method === "POST") {
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function(){
            if(JSON.parse(body).buildingsHeightList){
                const batimentsInstance = new Batiments(JSON.parse(body).buildingsHeightList)
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({total_trapped_water:batimentsInstance.trappedWater()}));
            } 
        });
    }
}

const server = httpClient.createServer(requestListener);

server.listen(port,host, ()=>{
    console.log(`Server is running on http://${host}:${port}`);
})