const { query } = require("express");
const express = require("express");
const { json, clearCookie } = require("express/lib/response");
const router = express.Router();
const mf = require("./functions.js");
let data = require("./json/data.json");

data = data.map((obj) => JSON.parse(obj));

// Default response
router.get("/", (req, res) =>
  res.json(
    data
      .map((x) => Object.keys(x))
      .reduce((acc, e) => acc.concat(e))
      .filter((e) => e !== "_meta")
  )
);

//Get array of keys
router.get("/:set/keys", (req, res) => {
  const queryData = req.params.set;
  const dataset = queryData.includes("class")
    ? data.filter((obj) => "classes" in obj)[0]["classes"]
    : data.filter((obj) => queryData in obj);

  if (dataset.length) {
    let sendResponse = mf.getKeys(dataset, queryData);

    res.json(sendResponse);
  } else {
    res.status(400).json({ msg: `No found data for ${queryData}` });
  }
});

//Get array of data
router.get("/:set/", (req, res) => {
  const queryData = req.params.set;
  const isClassBool = Boolean(
    queryData.match(/^class$|^subclass$|^classFeature$|^subclassFeature$/)
  );
  let dataset = isClassBool
    ? data.filter((obj) => "classes" in obj)[0]["classes"]
    : data.filter((obj) => queryData in obj);
  const reqProp = req.query.get;
  const reqFil = req.query.filters;

  if (dataset.length) {
    let sendResponse;
    if (reqProp) {
      sendResponse = mf.getPropertyArray(dataset, queryData, reqProp, reqFil);
    } else {
      sendResponse = mf.simplifyJson(dataset, queryData, reqFil);
    }

    sendResponse = sendResponse.length === 1 ? sendResponse[0] : sendResponse;

    res.json(sendResponse);
  } else {
    res.status(400).json({ msg: `No found data for ${queryData}` });
  }
});

module.exports = router;
