fetch("https://raw.githubusercontent.com/5etools-mirror-1/5etools-mirror-1.github.io/master/data/spells/spells-phb.json")
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


const characterList = document.querySelector("#characterList")
let characterId = 1;

//localStorage.setItem("characters", JSON.stringify(["Yo Merengues"]))

if(localStorage.getItem("characters")){
  const characters = JSON.parse(localStorage.getItem("characters"))
  characters.forEach(element => {
    const li = document.createElement("li")
    characterList.appendChild(li).id = `character${characterId}`
    document.getElementById(`character${characterId}`).innerText = element
    characterId++
  })
} else {
  const initialCharacters = []
  localStorage.setItem("characters", JSON.stringify(initialCharacters))
}

characterList.appendChild(document.createElement("li")).id = "createNew"
document.getElementById("createNew").innerText = "Create new character"

document.querySelector("#characterList").addEventListener("click", event => myAlert(event.target))

function myAlert(event){
  if(event.id === "createNew") {
    window.location.href = "../character-creation"
  } else {
    console.log(event.id)
  }
}