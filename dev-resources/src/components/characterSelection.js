import SavedCharacters from "./savedCharacters.js";

let existingCharacters = JSON.parse(localStorage.getItem("characters"));

if (!Boolean(existingCharacters)) {
  existingCharacters = [];
  localStorage.setItem("characters", JSON.stringify(existingCharacters));
}

const characterSelection = () => {
  return (
    <section id="page1">
      <section id="characterSelection">
        <h1>
          D&D 5e <br></br>Combat Cheat Sheet
        </h1>
        <h2>Select your Character!</h2>
        <ul className="characterSelection">
          {existingCharacters.map((char, idx) => (
            <SavedCharacters
              key={idx}
              text={"Get existing character names here"}
            />
          ))}
          <SavedCharacters
            key={existingCharacters.length}
            text="Create new character"
          />
        </ul>
      </section>
    </section>
  );
};

export default characterSelection;
