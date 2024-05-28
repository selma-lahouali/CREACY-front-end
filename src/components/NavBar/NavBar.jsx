import logo from "../../assets/logo-navBare.png";
import { MdEmail } from "react-icons/md";
import "./NavBar.css";
import { Link, Outlet } from "react-router-dom";
import DarkLightMode from "../../components/DarkLightMode/DarkLightMode";
import ProfilBtn from "../../components/ProfilBtn/ProfilBtn";
import SearchBar from "../SearchBar/SearchBar";
import LanguageSelector from "../i18n/Languages";
const NavBar = () => {
  return (
    <>
      <div className="navBar">
        <Link to="/home">
          <img src={logo} alt="image not found" className="home-logo" />
        </Link>
        <SearchBar></SearchBar>

        <DarkLightMode></DarkLightMode>

        <MdEmail className="home-messangerie" />

        <h1>
          <LanguageSelector />
        </h1>

        <ProfilBtn></ProfilBtn>
      </div>
      {/* used in parent route elements to render their child route elements. */}
      <Outlet />
    </>
  );
};

export default NavBar;
