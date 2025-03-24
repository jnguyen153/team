import { Scissors, Palette, Wind, Sparkles } from 'lucide-react';

const services = [
  {
    icon: <Scissors className="w-8 h-8" />,
    title: 'Haircuts',
    description: 'Expert cuts tailored to your style and face shape',
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Coloring',
    description: 'Professional color services from subtle to bold',
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: 'Styling',
    description: 'Perfect styling for any occasion',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Treatments',
    description: 'Revitalizing treatments for healthy hair',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">Experience the best in hair care and styling</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-red-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;