import axios from "axios";
import { useEffect, useState } from "react";

const ShopBtn = () => {
  const [shop, setShop] = useState(null);



  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user ? user._id : null;
 console.log("ididididid",ownerId);
 const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/shop/owner/${ownerId}`,{
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
  }, [token,ownerId]);

  return (
    <div>
      {shop ? (
        <div>
          <h2>Shop Details</h2>
          <p>Name: {shop.name}</p>
          <p>Description: {shop.description}</p>
          <p>Category: {shop.category}</p>
          {/* Add more shop details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShopBtn;
