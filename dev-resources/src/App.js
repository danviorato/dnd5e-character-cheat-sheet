import { useState, useEffect } from "react";
import CharacterSelection from "./components/characterSelection.js";
import CharacterCreation from "./components/characterCreation.js";
import CharacterSheet from "./components/characterSheet.js";
import ThemeSelect from "./components/themeSelect.js";

let currentTheme = localStorage.getItem("theme");

if (!Boolean(currentTheme)) {
  currentTheme = "light";
  localStorage.setItem("theme", currentTheme);
}

function App() {
  const [pageOne, showPageOne] = useState(false); //Should be true
  const [pageTwo, showPageTwo] = useState(true); //Should be false
  const [pageThree, showPageThree] = useState(false); //Should be false

  useEffect(() => {
    //document.querySelector("main").classList.add(`theme-${currentTheme}`);
  });

  const changePage = (page) => {
    switch (page) {
      case 1:
        showPageOne(true);
        showPageTwo(false);
        showPageThree(false);
        break;
      case 2:
        showPageOne(false);
        showPageTwo(true);
        showPageThree(false);
        break;
      default:
        showPageOne(false);
        showPageTwo(false);
        showPageThree(true);
        break;
    }
  };

  return (
    <main className={`theme-${currentTheme}`}>
      {pageOne && (
        <CharacterSelection
          toPageTwo={() => changePage(2)}
          toPageThree={() => changePage(3)}
        />
      )}
      {pageTwo && <CharacterCreation toPageOne={() => changePage(1)} />}
      {pageThree && <CharacterSheet />}
      <ThemeSelect />
    </main>
  );
}

export default App;
