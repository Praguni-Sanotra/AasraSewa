import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import apiService from "../services/api";
import "./../Styles/Payment.css";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ clientSecret, paymentId, property, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      const confirm = await apiService.confirmPayment(paymentId, "card");
      if (confirm.success) {
        onSuccess();
      } else {
        setError(confirm.error || "Payment confirmed but not recorded.");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      {error && <div className="error-message">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="pay-button"
      >
        {loading ? "Processing..." : `Pay ₹${property.pricePerNight}`}
      </button>
    </form>
  );
};

const PropertyPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await apiService.getPropertyById(id);
        if (!result.success) {
          setError(result.error || "Property not found");
          setLoading(false);
          return;
        }

        const fetchedProperty = result.data.property;
        setProperty(fetchedProperty);

        // If property is free, book directly
        if (fetchedProperty.pricePerNight === 0) {
          const bookResult = await apiService.bookFreeProperty(fetchedProperty._id);
          if (bookResult.success) {
            toast.success("✅ Accommodation Confirmed!", {
              position: "top-center",
              autoClose: 2500,
            });
            setTimeout(() => {
              navigate("/accommodation", {
                state: { property: fetchedProperty },
              });
            }, 2500);
            return;
          } else {
            setError(bookResult.error || "Booking failed");
            setLoading(false);
            return;
          }
        }

        // Create Stripe Payment Intent for paid properties
        const paymentIntent = await apiService.createPaymentIntent(
          fetchedProperty._id,
          fetchedProperty.pricePerNight
        );

        if (paymentIntent.success) {
          setClientSecret(paymentIntent.data.clientSecret);
          setPaymentId(paymentIntent.data.paymentId); // you must return this in your API
        } else {
          setError(paymentIntent.error);
        }
      } catch (err) {
        setError("Error loading property or payment intent.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleSuccess = () => {
    toast.success("✅ Payment Successful! Booking confirmed.", {
      position: "top-center",
      autoClose: 2500,
    });

    // Delay navigation by 2.5 seconds so user sees the toast
    setTimeout(() => {
      navigate("/home", {
        state: {
          message: "Booking Successful!",
          mapLocation: {
            area: property.landmark,
            city: property.fullAddress,
            pincode: property.pincode,
          },
        },
      });
    }, 2500);
  };

  if (loading) return <div>Loading...</div>;
  if (error || !property) return <div>{error || "Property not found."}</div>;
  if (property.pricePerNight === 0 && !error) return null; // Only blank if no error
  if (!clientSecret) return <div>Preparing payment...</div>;

  return (
    <div className="payment-page">
      <h2>Confirm Booking</h2>
      <div className="payment-container">
        <div className="property-summary">
          <img src={property.propertyImage} alt={property.title} />
          <div className="property-details">
            <h3>{property.title}</h3>
            <p>
              <strong>Address:</strong> {property.fullAddress}
            </p>
            <p>
              <strong>Landmark:</strong> {property.landmark}
            </p>
            <p>
              <strong>₹{property.pricePerNight} / night</strong>
            </p>
          </div>
        </div>

        <div className="payment-section">
          <h3>Payment</h3>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              paymentId={paymentId}
              property={property}
              onSuccess={handleSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
