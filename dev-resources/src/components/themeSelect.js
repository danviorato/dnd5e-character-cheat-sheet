import Theme from "./theme.js";

const themes = [
  { name: "light", color: "#FFFFFF" },
  { name: "dark", color: "#000000" },
];

const themeSelect = () => {
  return (
    <aside id="themeSelect">
      <ul id="themeOptions">
        {themes.map((theme, idx) => (
          <Theme key={idx} text={theme.name} color={theme.color} />
        ))}
      </ul>
    </aside>
  );
};

export default themeSelect;
