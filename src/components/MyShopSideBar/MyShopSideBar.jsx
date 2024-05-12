import { NavLink } from "react-router-dom";
import "./MyShopSideBar.css";
import { FaPlusCircle } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { ImStatsDots } from "react-icons/im";
import { PiUserListFill } from "react-icons/pi";
import ShopCard from "../ShopCard/ShopCard";

const MyShopSideBar = () => {
  return (
    <>
      <div className="shop-sideBar">
        <ul>
          <ShopCard></ShopCard>

          {/* add New Product / add New Product / add New Product / add New Product  */}
          <div className="sideBar-list">
            <NavLink to="/addNewProduct">
              <li>
                <FaPlusCircle className="shop-icon" /> Add A Product
              </li>
            </NavLink>
          </div>
          {/* manage Products / manage Products / manage Products / manage Products / manage Products */}
          <div className="sideBar-list">
            <NavLink to="/manageProducts">
              <li>
                <RiEdit2Fill className="shop-icon" />
                Manage Products
              </li>
            </NavLink>
          </div>
          {/* sales Statistic / sales Statistic / sales Statistic / sales Statistic / sales Statistic */}
          <div className="sideBar-list">
            <NavLink to="/salesStatistic">
              <li>
                <ImStatsDots className="shop-icon" />
                Sales statistic
              </li>
            </NavLink>
          </div>
          {/* customers List / customers List / customers List / customers List / customers List */}
          <div className="sideBar-list">
            <NavLink to="/customersList">
              <li>
                <PiUserListFill className="shop-icon" /> Customers List
              </li>
            </NavLink>
          </div>
        </ul>
      </div>
    </>
  );
};

export default MyShopSideBar;
