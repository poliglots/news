function Nav({ onInputChange }: { onInputChange: (val: string) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.currentTarget.value);
  };
  return (
    <div className="navbar">
      <button className="button is-link is-light header-items">News</button>
      <input
        className="button header-items"
        placeholder="search by source"
        onChange={handleChange}
      ></input>
    </div>
  );
}

export default Nav;
