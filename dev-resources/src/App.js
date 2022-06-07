import { useState } from "react";
import CharacterSelection from "./components/characterSelection.js";
import CharacterCreation from "./components/characterCreation.js";
import CharacterSheet from "./components/characterSheet.js";
import ThemeSelect from "./components/themeSelect.js";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <main className="theme-light">
      {currentPage === 1 && <CharacterSelection />}
      {currentPage === 2 && <CharacterCreation />}
      {currentPage === 3 && <CharacterSheet />}
      <ThemeSelect />
    </main>
  );
}

export default App;
