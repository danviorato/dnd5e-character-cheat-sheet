import Theme from "./theme.js";

const themes = ["light", "dark"];

const themeSelect = () => {
  return (
    <aside id="themeSelect">
      <ul id="themeOptions">
        {themes.map((theme, idx) => (
          <Theme key={idx} text={theme} />
        ))}
      </ul>
    </aside>
  );
};

export default themeSelect;
