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
    },
    reduceObjectsToArray: function(jsons,queries){
        let filteredJson = jsons.filter(objects => queries[0] in objects)
        let parsedJson = filteredJson.map(arrayLevel => arrayLevel[queries[0]].map(jsonLevel => jsonLevel[queries[1]])).reduce((acc, element) => acc.concat(element),[])
        if (queries[0] == "class") {
            parsedJson = parsedJson.map(element => (element.includes("(") ? element.slice(0,element.indexOf("(")):element).trim())
        }
        parsedJson = parsedJson.filter(element => !/Mystic|Prestige|Sidekick/.test(element))
        return [...new Set(parsedJson)]
    }
}

module.exports = utilities