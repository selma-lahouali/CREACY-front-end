import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import SuccessNotification from "../Notification/SuccessNotification";
import FailNotification from "../Notification/FailNotification";
import Swal from "sweetalert2";
import "./UserCart.css";
import {Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserCart = () => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  // success or fail to delet product notifications
  const [successNotification, setSuccessNotification] = useState(null);
  const [failNotification, setFailNotification] = useState(null);
  const navigate = useNavigate();
  // retrive user id and token from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  // API call get user cart / API call get user cart / API call get user cart
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
          setCartId(res.data._id);
        })
        .catch((error) => {
          console.error("Error fetching user's cart:", error);
        });
    }
  }, [userId, token, API]);
  // change product quantity / change product quantity / change product quantity
  const updateProductQuantity = (updatedCart) => {
    axios
      .put(
        `${API}/cart/${userId}`,
        { products: updatedCart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        console.log("Cart updated successfully:");
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };
  // fucntion that add or disminus product quantity by 1 / ucntion that add or disminus product quantity by 1
  const updateQuantity = (index, delta) => {
    const updatedCart = cart.map((product, i) => {
      if (i === index) {
        return { ...product, quantity: Math.max(1, product.quantity + delta) };
      }
      return product;
    });
    setCart(updatedCart);
    updateProductQuantity(updatedCart);
  };
  //  delet product from cart  /API call to delet product from cart
  const deleteProductFromCart = (productId) => {
    axios
      .delete(`${API}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("Product deleted successfully");
        setCart((prevCart) =>
          prevCart.filter((product) => product.productId !== productId)
        );
        setSuccessNotification(t("UserCart.productDeletedSuccessfully"));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        setFailNotification(t("UserCart.failedToDeleteProduct"));
      });
  };
  // reset notification message / reset notification message / reset notification message
  useEffect(() => {
    if (successNotification) {
      const timer = setTimeout(() => {
        setSuccessNotification(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [successNotification]);
  // if the prodcut deletion fail / if the prodcut deletion fail / if the prodcut deletion fail
  useEffect(() => {
    if (failNotification) {
      const timer = setTimeout(() => {
        setFailNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [failNotification]);

  // creat an order
  const handleCheckout = () => {
    if (!userId || !token) {
      return;
    }
    axios
      .post(
        `${API}/order/${userId}`,
        {
          products: cart,
          amount: cart.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          ),
          address: {},
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Order placed successfully:");
        const orderId = res.data._id; 
        localStorage.setItem('orderId', orderId);
        setCart([]);
        emptyingCart();
        // sweet alert success message
        Swal.fire({
          title: t("UserCart.orderCreatedTitle"),
          text: t("UserCart.orderCreatedText"),
          icon: "success",
        });
          // Navigate to the order page
      navigate("/order");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        //  sweet alert error message
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: t("UserCart.failOrderText"),
        });
      });
  };
  // empty cart after checkout
  const emptyingCart = () => {
    axios
      .delete(`${API}/cart/${userId}/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("cart deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting cart:", error);
      });
  };
  return (
    <div className="cart-box">
      {successNotification && (
        <SuccessNotification message={successNotification} />
      )}
      {failNotification && <FailNotification message={failNotification} />}
      {cart.length > 0 ? (
        <>
          <table className="cart-product">
            <thead>
              <tr>
              <th>{t("UserCart.product")}</th>
                <th>{t("UserCart.quantity")}</th>
                <th>{t("UserCart.subtotal")}</th>
                <th>{t("UserCart.action")}</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={product._id}>
                  <td>
                    <div className="cart-prod-info-img">
                      <img src={product.image} alt="image not found" />
                      <div className="cart-prod-info">
                        <h3 className="cart-prod-name-limit">
                        {t("UserCart.name")} : {product.name}
                        </h3>
                        <h3>{t("UserCart.price")} : ${product.price?.toFixed(2)}</h3>
                        <h3>{t("UserCart.color")} : {product.color}</h3>
                        <h3>{t("UserCart.size")} : {product.size}</h3>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cart-quantity">
                      <FaMinus className="cart-quantity-icon" onClick={() => updateQuantity(index, -1)} />
                      <h1>{product.quantity}</h1>
                      <FaPlus className="cart-quantity-icon" onClick={() => updateQuantity(index, 1)} />
                    </div>
                  </td>
                  <td>
                    <div className="Subtotal">
                      <h3>${(product.price * product.quantity).toFixed(2)}</h3>
                    </div>
                  </td>
                  <td>
                    <ImBin2
                      onClick={() => deleteProductFromCart(product.productId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* user cart total amount / user cart total amount / user cart total amount */}
          <div className="cart-total">
            <h1>{t("UserCart.cartTotal")}</h1>
            <h2>
              $
              {cart
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </h2>
            <button onClick={handleCheckout}>{t("UserCart.proceedToCheckout")}</button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <h1>{t("UserCart.emptyCart")}</h1>
          <Link to="/home">
            <h2>{t("UserCart.addProductsToCart")}</h2>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserCart;
