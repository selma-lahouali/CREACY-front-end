import logo from "../../assets/logo-navBare .png";
import { MdEmail } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import "./NavBar.css";
import { Link, Outlet } from "react-router-dom";
import DarkLightMode from "../DarkLightMode/DarkLightMode";
import Profil from "../Profil/Profil";

const NavBar = () => {
  return (
    <>
      <div className="navBar">
        <Link to="/home">
          <img src={logo} alt="image not found" className="home-logo" />
        </Link>
        <form className="searchBar">
          <input
            type="search"
            name="searchBar"
            id="searchBar"
            placeholder="Search"
          />
          <IoMdSearch className="searchIcon" />
        </form>

        {/* dark mode / dark mode / dark mode / dark mode / dark mode / dark mode   */}
        <DarkLightMode></DarkLightMode>
        {/* Messenger */}
        <MdEmail className="home-messangerie" />
        <h1 className="languag">Eng</h1>

        {/* profil button / profil button / profil button / profil button*/}
        <Profil></Profil>
      </div>
      {/* used in parent route elements to render their child route elements. */}
      <Outlet />
    </>
  );
};

export default NavBar;
