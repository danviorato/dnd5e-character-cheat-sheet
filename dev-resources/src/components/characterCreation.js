import { useState, useEffect } from "react";
import CharacterTrait from "./characterTrait.js";
import CharacterOption from "./characterOptions";

const CharacterCreation = ({ text, toPageOne }) => {
  const [CurrentTrait, ChangeCurrentTrait] = useState("race");
  const [TraitArray, ChangeTraitArray] = useState([]);

  useEffect(() => {
    let url = `http://localhost:5000/api/${CurrentTrait}/?get=name`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => ChangeTraitArray(data))
      .catch((error) => console.log(`Error: ${error}`));
  }, [CurrentTrait]);

  return (
    <section id="page2">
      <section id="titles">
        <h1 onClick={toPageOne}>
          D&D 5e <br></br>Combat Cheat Sheet
        </h1>
        <h2>Character Creation</h2>
      </section>
      <section id="characterCreation">
        <section id="traits">
          <ul>
            <CharacterTrait
              trait="Race"
              getData={() => ChangeCurrentTrait("race")}
            />
            <CharacterTrait
              trait="Subrace"
              getData={() => ChangeCurrentTrait("subrace")}
            />
            <CharacterTrait
              trait="Class"
              getData={() => ChangeCurrentTrait("class")}
            />
            <CharacterTrait
              trait="Subclass"
              getData={() => ChangeCurrentTrait("subclass")}
            />
            <CharacterTrait
              trait="Spells"
              getData={() => ChangeCurrentTrait("spells")}
            />
            <CharacterTrait
              trait="Feats"
              getData={() => ChangeCurrentTrait("feat")}
            />
            <CharacterTrait
              trait="Background"
              getData={() => ChangeCurrentTrait("background")}
            />
          </ul>
        </section>
        <section id="characterCreationMain">
          <section id="traitOptions">
            <CharacterOption list={TraitArray} />
          </section>
          <section id="traitDescription"></section>
        </section>
      </section>
      <footer>
        <button id="btnReturnPageOne" onClick={toPageOne}>
          Return to Select
        </button>
        <button id="btnCreateCharacter" onClick={() => alert("WIP")}>
          Save Character
        </button>
      </footer>
    </section>
  );
};

export default CharacterCreation;
