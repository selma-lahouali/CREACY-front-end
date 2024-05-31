import { FaShoppingCart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/AuthSlice";
import { useTranslation } from 'react-i18next';

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sideBar">
      <ul>
        <div className="sideBar-top">
          <Link to="/cart">
            <li>
              <FaShoppingCart className="sideBar-icon" />
              {t('homePage.myCart')}
            </li>
          </Link>
          <Link to="/order">
            <li>
              <GiShoppingBag className="sideBar-icon" />
              {t('homePage.myOrder')}
            </li>
          </Link>
          <Link to="/myShop">
            <li>
              <FaShop className="sideBar-icon" />
              {t('homePage.myShop')}
            </li>
          </Link>
        </div>
        <div className="sideBar-bottom">
          <Link to="/settings">
            <li>
              <IoSettingsSharp className="sideBar-icon" />
              {t('homePage.settings')}
            </li>
          </Link>
          <Link to="/login">
            <li onClick={handleLogout}>
              <MdLogout className="sideBar-icon" />
              {t('homePage.logOut')}
            </li>
          </Link>
        </div>
      </ul>
      
    </div>
  );
};

export default SideBar;
