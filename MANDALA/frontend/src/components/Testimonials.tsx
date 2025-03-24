import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    text: 'Absolutely love how my hair turns out every time I visit Red & White. The staff is professional and friendly!',
  },
  {
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    text: "Best salon experience I've ever had. They really listen to what you want and deliver amazing results.",
  },
  {
    name: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    text: "The attention to detail and level of service here is outstanding. Wouldn't trust anyone else with my hair!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          What Our Clients Say
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-gray-400 hover:text-red-600"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="text-center">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
            />
            <p className="text-xl text-gray-600 mb-6">"{testimonials[currentIndex].text}"</p>
            <p className="font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
          </div>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-gray-400 hover:text-red-600"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;