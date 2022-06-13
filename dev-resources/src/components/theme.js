let currentTheme = localStorage.getItem("theme");

if (!Boolean(currentTheme)) currentTheme = "light";

function changeTheme(theme) {
  const mainObj = document.querySelector("main");
  const oldTheme = mainObj.classList[0];
  const newTheme = `theme-${theme}`;

  mainObj.classList.remove(oldTheme);
  mainObj.classList.add(newTheme);

  localStorage.setItem("theme", theme);

  document
    .querySelectorAll(".themeOption")
    .forEach(
      (li) => !li.classList.contains("hidden") && li.classList.add("hidden")
    );

  document.querySelector(`#${theme}Theme`).classList.remove("hidden");
}

const Theme = ({ text }) => {
  return (
    <li
      id={`${text}Theme`}
      className={`themeOption${currentTheme === text ? "" : " hidden"}`}
      onClick={() => changeTheme(text)}
    >
      <button
        id={`${text}Sample`}
        className="themeSample"
        onClick={() => changeTheme(text)}
      ></button>
    </li>
  );
};

export default Theme;
