import CharacterTrait from "./characterTrait.js";

const characterCreation = ({ text, toPageOne }) => {
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
            <CharacterTrait trait="Race" />
            <CharacterTrait trait="Subrace" />
            <CharacterTrait trait="Class" />
            <CharacterTrait trait="Subclass" />
            <CharacterTrait trait="Spells" />
            <CharacterTrait trait="Feats" />
            <CharacterTrait trait="Background" />
          </ul>
        </section>
        <section id="characterCreationMain">
          <section id="traitOptions"></section>
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

export default characterCreation;
