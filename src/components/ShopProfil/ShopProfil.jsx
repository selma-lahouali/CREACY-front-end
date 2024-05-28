import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShopProfil.css";
import { useTranslation } from "react-i18next";

const ShopProfil = () => {
  const { t } = useTranslation();
  const [shop, setShop] = useState(null);
  // retrive user id from local storage / retrive user id from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  // format creat date / format creat date / format creat date / format creat date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  //   get shop by user id API call / get shop by user id API call
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `${API}/shop/owner/${ownerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setShop(response.data);
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    };

    fetchShop();
  }, [token, ownerId,API]);

  return (
    <>
      <div className="shop-box">
      <h2>{t("ShopProfil.yourShop")}</h2>
        {shop ? (
          <div className="shop">
            <div className="shop-profil">
              <img
                src={shop.image}
                alt="image not found"
                className="shop-image"
              />
              <div className="profil-shop-info">
              <h3>{t("ShopProfil.shopName")}: {shop.name}</h3>
                <h3>{t("ShopProfil.description")}: {shop.description}</h3>
                <h3>{t("ShopProfil.category")}: {shop.category}</h3>
                <h3>{t("ShopProfil.createdOn")}: {formatDate(shop.createdAt)} </h3>
              </div>
            </div>
            <Link to="/settings">
            <button>{t("ShopProfil.editShop")}</button>
            </Link>
          </div>
        ) : (
          <h3 className="noShop">
             {t("ShopProfil.noShop")}
            <span className="CreatShop-link">
            <Link to="/CreatShop">{t("ShopProfil.createShop")}</Link>
            </span>
          </h3>
        )}
      </div>
    </>
  );
};

export default ShopProfil;
