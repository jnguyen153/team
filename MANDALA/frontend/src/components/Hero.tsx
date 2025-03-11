const Hero = () => {
    return (
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://img.freepik.com/premium-psd/pecat_1207275-7.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Discover the Beauty of Mandala Art
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 animate-fade-in-delay">
              Explore our collection of handcrafted mandalas and spiritual artwork
            </p>
            <a
              href="#product"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors animate-fade-in-delay-2"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;