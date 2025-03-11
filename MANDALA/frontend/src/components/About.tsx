
const About = () => {
    return (
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Salon Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About LuxeLocks</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over a decade of experience, LuxeLocks Hair Salon has been transforming looks and boosting confidence through expert hair styling and care. Our team of skilled professionals is dedicated to providing you with the perfect look that matches your personality and lifestyle.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in using only the finest products and staying current with the latest trends and techniques to ensure you receive the best possible service.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="block text-3xl font-bold text-red-600">500+</span>
                  <span className="text-gray-600">Happy Clients</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-red-600">10+</span>
                  <span className="text-gray-600">Years Experience</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-red-600">5⭐</span>
                  <span className="text-gray-600">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;