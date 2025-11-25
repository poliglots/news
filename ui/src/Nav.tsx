function Nav({
  lastUpdate,
  onInputChange,
}: {
  lastUpdate: string;
  onInputChange: (val: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.currentTarget.value);
  };
  return (
    <div className="navbar">
      <button className="header-items button is-link is-light">News</button>
      <input
        className="header-items button is-small"
        placeholder="search by source"
        onChange={handleChange}
      ></input>
      <button className="header-items button is-info is-light is-small">
        updated at : {lastUpdate} UTC
      </button>
    </div>
  );
}

export default Nav;
