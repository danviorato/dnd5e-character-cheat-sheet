const fs = require("fs")
const request = require("request")
const myfetch = import("node-fetch")

const utilities = {
    getContentType: function(extName){
        switch(extName){
            case ".js":
                return "text/javascript"
            case ".css":
                return "text/css"
            case ".json":
                return "application/json"
            case ".png":
                return "image/png"
            case ".jpg":
                return "image/jpg"
            default:
                return "text/html"
        }
    }
}

module.exports = utilities