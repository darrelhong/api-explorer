import "./Root.css";

function Root() {
  return (
    <>
      <div className="drawer">
        <input id="drawer" type="checkbox" className="drawer-toggle" />

        <label htmlFor="drawer" className="btn">
          Explore web APIs
        </label>

        <div className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay" />
          <div className="menu">
            <label htmlFor="drawer" className="drawer-close"></label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
