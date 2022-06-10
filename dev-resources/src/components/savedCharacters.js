const savedCharacters = ({ text, toPages }) => {
  return (
    <li className="existingCharacters" onClick={toPages}>
      {text}
    </li>
  );
};

export default savedCharacters;
