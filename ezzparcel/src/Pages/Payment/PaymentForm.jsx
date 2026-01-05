import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  const amount = parcelInfo.cost;
  const amountInCents = Math.round(amount * 100);

  console.log("Parcel info:", parcelInfo);
  console.log("Amount:", amount, "Amount in cents:", amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Invalid parcel cost");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      // Step 1: Create payment intent
      console.log("Creating payment intent with amount:", amountInCents);

      const { data } = await axiosSecure.post("/create-payment-intent", {
        amountInCents: amountInCents,
      });

      console.log("Payment intent response:", data);

      if (!data.clientSecret) {
        throw new Error("No client secret received");
      }

      // Step 2: Confirm payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user.displayName,
              email: user.email,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        console.error("Stripe error:", stripeError);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!", paymentIntent);
        setError("");
        await Swal.fire({
          title: "Payment Successful!",
          html: `Transaction ID: <strong>${paymentIntent.id}</strong>`,
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/dashboard/myparcels");

        // mark parcel paid also create payment history
        const paymentData = {
          parcelId: parcelId,
          transactionId: paymentIntent.id,
          amount: amount,
          status: "paid",
          userEmail: user.email,
          paymentMethod: paymentIntent.payment_method_types[0],
        };

        const paymentRes = await axiosSecure.post(
          "/payments/success",
          paymentData
        );
        if (paymentRes.data.paymentId) {
          console.log("payment history created successfully");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.error || err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 ">
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">
          Pay for Parcel Pickup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-black">
                Card Details
              </span>
            </label>
            <div className="border p-3 rounded-lg bg-base-200">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#333",
                      "::placeholder": { color: "#999" },
                    },
                    invalid: { color: "#e53935" },
                  },
                }}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!stripe || processing}
            className="btn btn-primary w-full text-lg"
          >
            {processing ? "Processing..." : `Pay $${amount}`}
          </button>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
