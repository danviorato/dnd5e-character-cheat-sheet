const fs = require("fs");

const utilities = {
  simplifyJson: function (arr, name, filters) {
    let newArr = name.includes("class")
      ? arr.map((obj) => obj[name]).reduce((acc, arr) => acc.concat(arr))
      : arr.map((obj) => obj[name])[0];

    if (name === "spells") {
      newArr = newArr
        .map((obj) => obj["spell"])
        .reduce((acc, arr) => acc.concat(arr));
    }

    newArr = newArr.filter((obj) => Boolean(obj));

    if (Boolean(filters)) newArr = this.filterDataSet(newArr, filters);

    return newArr;
  },
  getPropertyArray: function (arr, name, property, filters) {
    const sArr = this.simplifyJson(arr, name, filters);
    const propArr = sArr.map((obj) => obj[property]);
    const response = propArr.every((e) => !e)
      ? { msg: `No found data for ${property}` }
      : [...new Set(propArr)];
    return response;
  },
  getKeys: function (arr, name) {
    const sArr = this.simplifyJson(arr, name);
    let keyArr = sArr
      .map((obj) => (obj ? Object.keys(obj) : obj))
      .reduce((acc, arr) => acc.concat(arr));

    keyArr = [...new Set(keyArr)];

    return keyArr;
  },
  filterDataSet: function (arr, filters) {
    const arrFilters = this.prepareFilters(filters);
    const newArr = arr.filter((obj) =>
      arrFilters.every((arr) => obj[arr[0]] === arr[1])
    );

    return newArr;
  },
  prepareFilters: function (filterString) {
    const filterArr = filterString
      .split(";")
      .map((arr) => arr.split("~"))
      .filter((arr) => arr.length === 2);

    return filterArr;
  },
};

module.exports = utilities;
