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
        <div className="">
          <h1 className="text-4xl md:text-9xl text-white mb-6 animate-fade"
            style={{fontFamily:"'Playwrite HU', cursive", fontWeight:"700"}}>
            Mandala Studios
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;