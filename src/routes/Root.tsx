import { Outlet } from "react-router-dom";
import { ApiList } from "../components/ApiList";
import "./Root.css";
import { createPortal } from "react-dom";

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
            <ApiList />
          </div>
        </div>
      </div>
      {createPortal(<Outlet />, document.body)}
    </>
  );
}

export default Root;
