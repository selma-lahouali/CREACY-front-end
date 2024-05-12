import axios from "axios";
import { useEffect, useState } from "react";
import "./ShopCard.css";
import { Link } from "react-router-dom";
const ShopCard = () => {
  // shop states / shop states / shop states / shop states
  const [shop, setShop] = useState(null);
  //   retrive user id / retrive user id / retrive user id / retrive user id
  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user ? user._id : null;
  const token = localStorage.getItem("token");
  //   get shop by user id API call / get shop by user id API call
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/shop/owner/${ownerId}`,
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
  }, [token, ownerId]);

  return (
    <>
      {shop ? (
        <div className="shop-name">
          <li>
            <img src={shop.image} alt="image not found" className="shop-logo" />
            <h>{shop.name}</h>
          </li>
        </div>
      ) : (
        <div className="shop-name">
          <Link to="/CreatShop">
            <p>Creat A Shop</p>
          </Link>{" "}
        </div>
      )}
    </>
  );
};

export default ShopCard;
