import { Link, NavLink, useNavigate } from "react-router-dom";
import "./MyShopSideBar.css";
import { FaPlusCircle } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import ShopCard from "../../components/ShopCard/ShopCard";
import { useTranslation } from "react-i18next";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/AuthSlice";

const MyShopSideBar = () => {
    const { t } = useTranslation();
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
      <div className="shop-sideBar">
        <ul>
          <ShopCard></ShopCard>
          {/* add New Product / add New Product / add New Product / add New Product  */}
          <div className="sideBar-list">
            <NavLink to="/addNewProduct">
              <li>
              <FaPlusCircle className="shop-icon" /> {t("myShopSideBar.addProduct")}
              </li>
            </NavLink>
          </div>
          {/* manage Products / manage Products / manage Products / manage Products / manage Products */}
          <div className="sideBar-list">
            <NavLink to="/manageProducts">
              <li>
                <RiEdit2Fill className="shop-icon" />
                {t("myShopSideBar.manageProducts")}
              </li>
            </NavLink>
          </div>
          {/* settings */}
          <div className="sideBar-list">
          <Link to="/shopSettings">
            <li>
              <IoSettingsSharp className="sideBar-icon" />
              {t('homePage.settings')}
            </li>
          </Link>
          </div>
          {/* log out */}
          <div className="sideBar-list">
          <Link to="/login">
            <li onClick={handleLogout}>
              <MdLogout className="sideBar-icon" />
              {t('homePage.logOut')}
            </li>
          </Link>
          </div>
        </ul>
      </div>
    </>
  );
};

export default MyShopSideBar;
