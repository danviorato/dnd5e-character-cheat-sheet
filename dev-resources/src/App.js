import { useState } from "react";
import CharacterSelection from "./components/characterSelection.js";
import ThemeSelect from "./components/themeSelect.js";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <h1>D&D 5e Combat Cheat Sheet</h1>
      {currentPage === 1 && <CharacterSelection />}
      {currentPage === 2 && <CharacterSelection />}
      {currentPage === 3 && <CharacterSelection />}
      <ThemeSelect />
    </>
  );
}

export default App;
