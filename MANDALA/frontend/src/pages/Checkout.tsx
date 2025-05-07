import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StripeCheckoutForm from '../components/StripeCheckoutForm';

// Load Stripe outside of component rendering to avoid recreating the Stripe object
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Get API URL from environment variable
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    // Create PaymentIntent as soon as the page loads
    fetch(`${apiUrl}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt', amount: 1000 }] }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.clientSecret) {
          throw new Error('No client secret received from server');
        }
        setClientSecret(data.clientSecret);
      })
      .catch(err => {
        console.error('Error creating payment intent:', err);
        setPaymentStatus('error');
      });
  }, []);

  const appearance = {
    theme: 'stripe' as const,
  };
  
  const loader = 'auto' as const;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Section */}
            <div className="space-y-6">
              {paymentStatus === 'error' ? (
                <div className="p-4 border border-red-300 bg-red-50 rounded text-red-700">
                  <p>Unable to connect to the payment service. Please try again later.</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              ) : clientSecret ? (
                <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                  <StripeCheckoutForm />
                </Elements>
              ) : (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="text-gray-600">Subtotal: $10.00</p>
                  <p className="text-gray-600">Shipping: $0.00</p>
                  <p className="text-gray-600">Tax: $0.00</p>
                </div>
                <div className="font-bold text-lg">
                  Total: $10.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;