const theme = ({ text, color }) => {
  return (
    <li id={`${text}Theme`} className="themeOption">
      {color}
    </li>
  );
};

export default theme;
