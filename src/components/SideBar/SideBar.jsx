import { FaShoppingCart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FaShop } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import "./SideBar.css";
const SideBar = () => {
  return (
    <>
      <div className="sideBar">
        <ul>
          <div className="sideBar-top">
            <Link to="/cart">
              <li>
                <FaShoppingCart className="sideBar-icon"/>
                My Shop
              </li>
            </Link>
            <Link to="/favorit">
              <li>
                <IoMdHeart className="sideBar-icon"/>
                Favorites
              </li>
            </Link>
            <Link to="/myShop">
              <li>
                <FaShop className="sideBar-icon"/>
                My Shop
              </li>
            </Link>
          </div>
          <div className="sideBar-bottom">
            <Link to="/settings">
              <li>
                <IoSettingsSharp className="sideBar-icon"/>
                Settings
              </li>
            </Link>
            <Link to="/logout">
              <li>
                <MdLogout className="sideBar-icon"/>
                Log Out
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
