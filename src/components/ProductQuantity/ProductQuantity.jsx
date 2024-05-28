import axios from "axios";
import { useState } from "react";

const ProductQuantity = () => {
  const [quantity, setQuantity] = useState();
  // retrive user id and token from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  const updateProdtQuantity = () => {
    axios
      .put(`${API}/products/quantity/${userId}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Quantity Updated successfully");
        setQuantity(res.data)
      })
      .catch((error) => {
        console.error("Error deleting product:", error);

      });
  };

  return <></>;
};

export default ProductQuantity;
