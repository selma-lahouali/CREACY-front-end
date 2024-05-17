import { FaShoppingCart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FaShop } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/AuthSlice";
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="sideBar">
        <ul>
          <div className="sideBar-top">
            <Link to="/cart">
              <li>
                <FaShoppingCart className="sideBar-icon" />
                My Cart
              </li>
            </Link>
            <Link to="/favorit">
              <li>
                <IoMdHeart className="sideBar-icon" />
                Favorites
              </li>
            </Link>
            <Link to="/myShop">
              <li>
                <FaShop className="sideBar-icon" />
                My Shop
              </li>
            </Link>
          </div>
          <div className="sideBar-bottom">
            <Link to="/settings">
              <li>
                <IoSettingsSharp className="sideBar-icon" />
                Settings
              </li>
            </Link>
            <Link to="/login">
              <li onClick={handleLogout}>
                <MdLogout className="sideBar-icon" />
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
