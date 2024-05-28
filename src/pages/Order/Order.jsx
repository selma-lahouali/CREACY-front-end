import axios from "axios";
import { useState, useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./Order.css";
import Stripe from "../Stripe/Stripe";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState([]);
  // Retrieve user ID and token from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  // API call to get user order
  useEffect(() => {
    if (userId && token) {
      axios
        .get(`${API}/order/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user's order:", error);
        });
    }
  }, [userId, token, API]);
  // Function to handle confirmation of purchase
  const handlePurchaseConfirmation = (
    orderId,
    total,
    productIds,
    productQuantity
  ) => {
    setSelectedOrder({ orderId, total });
    setSelectedProductId(productIds);
    setSelectedProductQuantity(productQuantity);
  };
  return (
    <>
      <SideBar></SideBar>
      <div className="order-box">
        {orders.map((order) => (
          <div className="order-payment" key={order._id}>
            <table className="order-product">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <div className="order-prod-info-img">
                        <img src={product.image} alt="image not found" />
                        <div className="order-prod-info">
                          <h3 className="order-prod-name-limit">
                            Name: {product.name}
                          </h3>
                          <h3>Price: ${product.price?.toFixed(2)}</h3>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="order-quantity">
                        <h1>{product.quantity}</h1>
                      </div>
                    </td>
                    <td>
                      <div className="Subtotal">
                        <h3>
                          ${(product.price * product.quantity).toFixed(2)}
                        </h3>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="order-total">
              <h1>Order Total</h1>
              <h2>
                $
                {order.products
                  .reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )
                  .toFixed(2)}
              </h2>
              <button
                onClick={() => {
                  const totalAmount = order.products.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  );

                  if (totalAmount < 0.5) {
                    alert("Amount must be at least 50 cents.");
                    return; // Prevent further execution
                  }

                  const productIds = order.products.map(
                    (product) => product.productId
                  );
                  const productQuantity = order.products.map(
                    (product) => product.quantity
                  );
                  handlePurchaseConfirmation(
                    order._id,
                    totalAmount,
                    productIds,
                    productQuantity
                  );
                }}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedOrder && selectedProductId && (
        <Stripe
          orderId={selectedOrder.orderId}
          total={selectedOrder.total}
          productId={selectedProductId}
          productQuantity={selectedProductQuantity}
        />
      )}
    </>
  );
};

export default Order;
