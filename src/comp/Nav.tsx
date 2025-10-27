function Nav() {
  return (
    <>
      <nav id="header" className="navbar is-fixed-top">
        <div className="navbar-brand">
          <button className="button is-info is-rounded">News</button>
          <div className="navbar-item">
            <div className="buttons">
              <input
                className="button is-primary is-light"
                placeholder="search"
              ></input>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
