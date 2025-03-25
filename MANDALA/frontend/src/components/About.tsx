
const About = () => {
    return (
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7181865/pexels-photo-7181865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Salon Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-200 mb-6">About MandalaStudios</h2>
              <p className="text-lg text-gray-600 mb-6">
              The Mandala Studio is an e-commerce web application designed to showcase and sell
Mandala artwork. 
 
              </p>
              <p className="text-lg text-gray-600 mb-8">
              This platform provides a seamless and user-friendly experience for
customers to browse, purchase, and request custom Mandala designs.
</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="block text-3xl font-bold text-blue-200">500+</span>
                  <span className="text-grey-200">Happy Clients</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-blue-200">2+</span>
                  <span className="text-grey-200">Years Experience</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-blue-200">5⭐</span>
                  <span className="text-grey-200">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;