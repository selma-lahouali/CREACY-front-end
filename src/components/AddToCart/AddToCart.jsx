import axios from "axios";
import { useTranslation } from "react-i18next";
import "./AddToCart.css";
import SuccessNotification from "../Notification/SuccessNotification";
import FailNotification from "../Notification/FailNotification";

import { useEffect, useState } from "react";

const AddToCart = ({ product }) => {
  const { t } = useTranslation();

  const [successNotification, setSuccessNotification] = useState(null);
  const [failNotification, setFailNotification] = useState(null);
  const API = import.meta.env.VITE_API;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const productDetails = {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      color: product.color,
      size: product.size,
    };

    try {
      const response = await axios.put(`${API}/cart`, productDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response data:", response.data);
      setSuccessNotification(t('home.addToCartSuccess')); 
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response ? error.response.data : error.message
      );
      setFailNotification(t('home.addToCartFail')); 
    }
  };

  useEffect(() => {
    if (successNotification) {
      const timer = setTimeout(() => {
        setSuccessNotification(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [successNotification]);

  useEffect(() => {
    if (failNotification) {
      const timer = setTimeout(() => {
        setFailNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [failNotification]);

  return (
    <>
      {successNotification && (
        <SuccessNotification message={successNotification} />
      )}
      {failNotification && <FailNotification message={failNotification} />}
      <button className="add-to-cart" onClick={handleAddToCart}>
        {t('home.addToCart')} {/* Access translation using 't' function */}
      </button>
    </>
  );
};

export default AddToCart;
