import { useEffect, useState } from "react";
import "./UserCart.css";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";

const UserCart = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  useEffect(() => {
    if (userId && token) {
      axios
        .get(`${API}/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCart(res.data.products);
          console.log("res.data.products", res.data.products);
        })
        .catch((error) => {
          console.error("Error fetching user cart:", error);
        });
    }
  }, [userId, token, API]);

  return (
    <div className="cart-box">
      {cart.length > 0 ? (
        <>
          <table className="cart-product">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className="cart-prod-info-img">
                      <img src={product.image} alt="image not found" />
                      <div className="cart-prod-info">
                        <h3>Name: {product.name}</h3>
                        <h3>Price: ${product.price.toFixed(2)}</h3>
                        <h3>Color: {product.color}</h3>
                        <h3>Size: {product.size}</h3>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cart-quantity">
                      <FaMinus />
                      <h1>{product.quantity}</h1>
                      <FaPlus />
                    </div>
                  </td>
                  <td>
                    <div className="Subtotal">
                      <h3>${(product.price * product.quantity).toFixed(2)}</h3>
                      <ImBin2 />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-total">
            <h1>Cart Total </h1>
            <h2>
              $
              {cart
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </h2>
            <button>Proceed To Checkout</button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <h1>Your cart is empty</h1>
        </div>
      )}
    </div>
  );
};

export default UserCart;
