import SavedCharacters from "./savedCharacters.js";

let existingCharacters = JSON.parse(localStorage.getItem("characters"));

if (!Boolean(existingCharacters)) {
  existingCharacters = [];
  localStorage.setItem("characters", JSON.stringify(existingCharacters));
}

const characterSelection = () => {
  return (
    <>
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
    </>
  );
};

export default characterSelection;
