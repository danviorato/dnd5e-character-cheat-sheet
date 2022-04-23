const path = require("path");
const fs = require("fs");
const http = require("http");
const request = require("request");

let jsonTest = request('https://github.com/5etools-mirror-1/5etools-mirror-1.github.io/raw/master/data/spells/spells-phb.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        let importedJSON = JSON.parse(body);
        return importedJSON;
    }
})

let csvTest = []
fs.readFile("./public/csv/jsonLinks.txt", "utf8", (err, data) => {
    if (err) throw err;
    csvTest.push(data.split(";"))
})

console.log(csvTest)

const server = http.createServer((req, res) => { 
    //Build file path
    let filePath = path.join(__dirname,"public", req.url === "/" ? "index.html" : req.url)

    // Extension of file
    let extName = path.extname(filePath)

    // Initial content type
    let contentType = "text/html"

    // Check ext and set content type
    switch(extName){
        case ".js":
            contentType = "text/javascript"
            break;
        case ".css":
            contentType = "text/css"
            break;
        case ".json":
            contentType = "application/json"
            console.log(extName, filePath)
            break;
        case ".png":
            contentType = "image/png"
            break;
        case ".jpg":
            contentType = "image/jpg"
            break;
    }

    // Check if contentType is text/html but no .html file extension
    //if (contentType == "text/html" && extname == "") filePath += ".html";
    
    // log the filePath
    console.log(filePath);

    //Read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == "ENOENT") {
                // Page not found
                fs.readFile(path.join(__dirname,"html","index.html"), (err, content)=>{
                    res.writeHead(200, {"Content-Type": contentType});
                    res.end(content, "utf8");
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            };
        } else {
            //Success
            fs.readFile(filePath, (err, content) => {
                res.writeHead(200, {"Content-Type": contentType});
                res.end(content, "utf8")
            })
        }
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
