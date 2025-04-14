import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  // Set the correct redirect URL when component loads
  useEffect(() => {
    // Use a simpler URL without hash navigation
    const origin = window.location.origin;
    const returnUrl = `${origin}/checkout_complete`;
    console.log("Setting return URL to:", returnUrl);
    setRedirectUrl(returnUrl);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment form submitted");

    if (!stripe || !elements) {
      console.log("Stripe not loaded yet");
      setMessage("Please wait while we initialize the payment system.");
      return;
    }

    setIsLoading(true);
    setMessage(null);
    
    console.log("Processing payment with redirect URL:", redirectUrl);

    try {
      console.log("Calling Stripe.confirmPayment");
      // Use Stripe's standard redirect approach but with a simple URL
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Simple URL without additional parameters
          return_url: redirectUrl,
        },
      });
      
      // This point will only be reached if there is an immediate error
      console.log("Payment confirmation error:", error);
      
      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "An unexpected error occurred.");
        } else {
          setMessage("An unexpected error occurred.");
        }
      }
    } catch (e) {
      console.error('Exception during payment confirmation:', e);
      setMessage("A system error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "accordion" as const
  };

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        
        {message && (
          <div className="text-red-600 text-sm p-2 bg-red-50 border border-red-200 rounded">
            {message}
          </div>
        )}
        
        <button 
          disabled={isLoading || !stripe || !elements || !redirectUrl} 
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
        >
          <span className={isLoading ? "invisible" : ""}>
            Pay now
          </span>
          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </span>
          )}
        </button>
        
        <div className="text-xs text-gray-500 text-center mt-2">
          {!stripe && "Loading payment system..."}
        </div>
      </form>
    </div>
  );
};

export default StripeCheckoutForm;