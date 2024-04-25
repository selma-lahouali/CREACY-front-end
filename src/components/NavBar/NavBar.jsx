import logo from "../../assets/logoV2.png";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import "./NavBar.css";
import { useState } from "react";
import profilImage from "../../assets/logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [darkLightToggle, setDarkLightToggle] = useState(true);
  const [profilOptions, setProfilOptions] = useState(true);

  const toggleDarkLightMode = () => {
    setDarkLightToggle(!darkLightToggle);
  };

  const toggleProfilOptions = () => {
    setProfilOptions(!profilOptions);
  };

  return (
    <>
      <div className="navBar">
        <img src={logo} alt="image not found" className="home-logo" />
        <form className="searchBar">
          <input
            type="search"
            name="searchBar"
            id="searchBar"
            placeholder="Search"
          />
          <IoMdSearch className="searchIcon" />
        </form>
        {/* Dark and light mode */}
        <div
          className={`darkLightMode ${
            darkLightToggle ? "darkMode" : "lightMode"
          }`}
          onClick={toggleDarkLightMode}
        >
          {darkLightToggle ? <MdDarkMode /> : <MdLightMode />}
        </div>
        {/* Messenger */}
        <MdEmail className="home-messangerie" />
        <h1 className="languag">Eng</h1>
        {/* profil button / profil button / profil button / profil button*/}

        <div className="profil" onClick={toggleProfilOptions}>
          <img src={profilImage} alt="image not found" className="profil-pic" />
          <h1>
            {profilOptions ? (
              "Profil"
            ) : (
              <ul>
                <Link to="/profil">
                  <li>Profil</li>
                </Link>
                <Link to="/account">
                  <li>Account</li>
                </Link>
                <Link to="/setting">
                  <li>Settings</li>
                </Link>
                <Link to="/contactUs">
                  <li>Contac Us</li>
                </Link>
                <li>Log Out</li>
              </ul>
            )}
          </h1>
        </div>
      </div>
    </>
  );
};

export default NavBar;
