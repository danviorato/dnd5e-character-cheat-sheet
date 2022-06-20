const showTrait = (trait) => {
  const selectedTrait = document.querySelector(`#trait${trait}Li`);
  const oldSelection = document.querySelector(".showTraitOptions");
  if (selectedTrait.classList.contains("characterTrait")) {
    oldSelection.classList.replace("showTraitOptions", "characterTrait");
    selectedTrait.classList.replace("characterTrait", "showTraitOptions");
  }
};

const CharacterTrait = ({ trait, getData }) => {
  return (
    <li
      id={`trait${trait}Li`}
      className={`${trait === "Race" ? " showTraitOptions" : "characterTrait"}`}
      onClick={() => {
        showTrait(trait);
        getData();
      }}
    >
      {/* <span className="traitSelected" id={`${trait}Selected`}>
        WIP
      </span> */}
      <span id={`trait${trait}Ph`} className="traitName centeredTrait">
        {trait}
      </span>
    </li>
  );
};

export default CharacterTrait;
