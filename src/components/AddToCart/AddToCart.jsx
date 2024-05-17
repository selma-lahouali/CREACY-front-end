import axios from "axios";

const AddToCart = ({ product }) => {
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

    console.log("Sending productDetails:", productDetails);

    try {
      const response = await axios.put(`${API}/cart`, productDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response data:", response.data);
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCart;
