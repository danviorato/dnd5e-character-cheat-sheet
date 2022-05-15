import { SingleSelectInput } from "./classes.js"
//const SingleSelectInput = myClasses.myClasses[0]


(async function(){
  const races = await getArrays('../api/getProperties?s=race&p=name')
  const raceSelection = new SingleSelectInput("race", races, "#raceSelectionArea","#raceOptions")
  raceSelection.init()
})()

async function getJsons(url){
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function getArrays(url){
  let response = await fetch(url);
  let data = await response.json();
//  data = data.map(x => JSON.parse(x[0]))
  return data;
}

/*
(async function(){
  let myData = await getJsons('../api/getData?s=class')
  console.log(myData)
})();

// Select the race
(async function(){
  let raceVar = await getArrays('../api/getProperties?s=race&p=name')
  console.log(raceVar.filter(a => a.length === 26))
})();*/