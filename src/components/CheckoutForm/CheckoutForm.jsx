import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import SideBar from "../SideBar/SideBar";
import "./CheckoutForm.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

const CheckoutForm = ({ amount, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method using card details
      const { error: createPaymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (createPaymentMethodError) {
        setError(createPaymentMethodError.message);
        return;
      }

      // Call backend to create PaymentIntent
      const response = await axios.post(
        `${API}/payment/${userId}/${orderId}`,
        {
          amount: amount 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extract clientSecret from the response
      const { clientSecret } = response.data;

      if (!clientSecret) {
        throw new Error("Missing clientSecret in payment intent response");
      }

      // Confirm PaymentIntent
      const { error: confirmError, paymentIntent: confirmedPaymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      if (confirmedPaymentIntent.status === "succeeded") {
        setSuccess(true);
        setIsLoading(false);
        Swal.fire({
          title: "Good job!",
          text: "Your Payment Has Been Sone Successfully!",
          icon: "success",
        });
        console.log("stripe payment successfull");
        navigate("/home")
        deleteOrderAfterPayment()
      } else {
        setError("Payment failed. Please try again.");
        setIsLoading(false);Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
      setIsLoading(false);
    }
  };
const deleteOrderAfterPayment=()=>{
  axios
  .delete(`${API}/order/${userId}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(() => {
    console.log("order deleted successfully");
   
  })
  .catch((error) => {
    console.error("Error deleting order:", error);
  });
}
  return (
    <>
      <SideBar />
      {isLoading && <Loader></Loader>}
      <div className="stripe-overlay">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <div className="card-element">
              <CardElement className="StripeElement" />
            </div>
            <button type="submit" disabled={!stripe}>
              Payment
            </button>
            {error && <div className="error-message">{error}</div>}
            {success && (
              <div className="success-message">Payment Successful!</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
