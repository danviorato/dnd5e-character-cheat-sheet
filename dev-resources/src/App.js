import { useState, useEffect } from "react";
import CharacterSelection from "./components/characterSelection.js";
import CharacterCreation from "./components/characterCreation.js";
import CharacterSheet from "./components/characterSheet.js";
import ThemeSelect from "./components/themeSelect.js";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    let currentTheme = JSON.parse(localStorage.getItem("theme"));

    if (!Boolean(currentTheme)) {
      currentTheme = "light";
    }

    document.querySelector("main").classList.add(`theme-${currentTheme}`);
  });

  return (
    <main>
      {currentPage === 1 && <CharacterSelection toPage={() => alert("Hola")} />}
      {currentPage === 2 && <CharacterCreation />}
      {currentPage === 3 && <CharacterSheet />}
      <ThemeSelect />
    </main>
  );
}

export default App;
