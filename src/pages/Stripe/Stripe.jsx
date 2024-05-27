import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripeKey=import.meta.env.VITE_STRIP8_KEY
const stripePromise = loadStripe(stripeKey);

const Stripe = ({ orderId, total }) => (
  <Elements stripe={stripePromise}>
   <CheckoutForm orderId={orderId} amount={total} />
  </Elements>
);

export default Stripe;
