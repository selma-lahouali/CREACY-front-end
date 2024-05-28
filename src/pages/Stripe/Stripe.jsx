import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripeKey = import.meta.env.VITE_STRIPE_KEY;
const stripePromise = loadStripe(stripeKey);

const Stripe = ({ orderId, total, productId, productQuantity }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm
      orderId={orderId}
      amount={total}
      productId={productId}
      productQuantity={productQuantity}
    />
  </Elements>
);

export default Stripe;
