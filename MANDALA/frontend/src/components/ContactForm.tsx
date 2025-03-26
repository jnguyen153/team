import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Sending data to server
    try {
      const response = await fetch('http://localhost:5000/send-email', { //using port 5000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Error during sending a form');
      }
    } catch (error) {
      alert('Error during sending a form');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-gray-600">
          Your message has been received. We'll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
