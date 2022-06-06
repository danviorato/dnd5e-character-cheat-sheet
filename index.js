const express = require("express");
const { append } = require("express/lib/response");
const path = require("path");
const cors = require("cors");

// Init server
const app = express();

// Allow CORS
app.use(cors());

// Homepage Route
//app.get("/", (req, res) =>
//  res.sendFile(path.join(__dirname, "public/index.html"))
//);

app.use(express.static(path.join(__dirname, "dev-resources/build")));

// API Routes
app.use("/api", require("./api/api"));

//Set port
const PORT = process.env.PORT || 5000;

//Set server to listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/*
const fs = require("fs");
const http = require("http");
const utilities = require("./public/js/functions.js");

const server = http.createServer((req, res) => {
  //Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file
  let extName = path.extname(filePath);

  // Initial content type
  let contentType = utilities.getContentType(extName);

  // Check if contentType is text/html but no .html file extension
  //if (contentType == "text/html" && extname == "") filePath += ".html";

  // log the filePath
  //console.log(filePath);

  //Read file
  if (req.method === "GET") {
    if (req.url.includes("api")) {
      contentType = utilities.getContentType(".json");
      filePath = path.join(__dirname, "public", "json", "data.json");
      fs.readFile(filePath, (err, content) => {
        res.writeHead(200, { "Content-Type": contentType });
        let jsonArray = JSON.parse(content).map((x) => JSON.parse(x[0]));
        let dataResponse;
        let query;
        if (req.url.includes("getData")) {
          query = req.url.slice(req.url.indexOf("s=") + 2).toLowerCase();
          dataResponse = JSON.stringify(
            req.url.includes("?s=")
              ? jsonArray.filter((x) => query in x)
              : jsonArray
          );
        } else if (req.url.includes("getProperties")) {
          query = [
            req.url
              .slice(req.url.indexOf("s=") + 2, req.url.indexOf("&"))
              .toLowerCase(),
            req.url.slice(req.url.indexOf("p=") + 2),
          ];
          dataResponse = JSON.stringify(
            utilities.reduceObjectsToArray(jsonArray, query)
          );
        }
        res.end(dataResponse, "utf8");
      });
      /*
            let jsonTest = request('https://github.com/5etools-mirror-1/5etools-mirror-1.github.io/raw/master/data/actions.json', function (error, response, body) {
                    let myBody = JSON.parse(body)
                    res.end(JSON.stringify(myBody))
                })   
            fs.readFile("./public/csv/jsonLinks.txt", "utf8", async (err, data) => {
                if (err) throw err;
                const jsonArr = await JSON.stringify(utilities.getJsons(data))
                res.end(jsonArr)
            })*/
/*
    } else {
      if (req.url === "/character-creation")
        filePath = path.join(__dirname, "public", "character-creation.html");
      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code == "ENOENT") {
            // Page not found
            fs.readFile(
              path.join(__dirname, "public", "index.html"),
              (err, content) => {
                res.writeHead(200, { "Content-Type": contentType });
                res.end(content, "utf8");
              }
            );
          } else {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
          }
        } else {
          //Success
          fs.readFile(filePath, (err, content) => {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
          });
        }
      });
    }
  } else if (req.method === "POST") {
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/
