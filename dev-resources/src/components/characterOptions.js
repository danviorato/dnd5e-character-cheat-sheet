const CharacterOption = ({ list }) => {
  return (
    <ul>
      {list.map((element) => {
        return <li>{element}</li>;
      })}
    </ul>
  );
};

export default CharacterOption;
