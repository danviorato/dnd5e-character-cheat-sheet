//document.querySelector("h1").addEventListener("click", myAlert())

let myData;
async function myAlert(){
    await fetch("../api")
      .then(res => res.json()) // parse response as JSON
      .then(async data => {
        await data.map(x => JSON.parse(x[0]))
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

async function hailMary(){
  let response = await fetch('../api/getData');
  let data = await response.json();
//  data = data.map(x => JSON.parse(x[0]))
  return data;
}

(async function(){
  myData = await hailMary()
  console.log(myData)
//  console.log(myData[0].race.filter(x=> x.name === "Aarakocra").map(x=>x.source))
})()
