import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className={`text-2xl font-bold ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>MandalaArt</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#about" className={`font-bold hover:text-red-600 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>About</a>
              <a href="#gallery" className={`font-bold hover:text-red-600 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>Gallery</a>
              <a href="#product" className={`font-bold hover:text-red-600 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>Product</a>
              <a href="#about" className={`font-bold hover:text-red-600 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>Contact Us</a>
              <a href="#cart" className={`relative hover:text-red-600 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`hover:text-red-600 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <a href="#about" className="block px-3 py-2 text-black font-bold hover:text-red-600">About</a>
            <a href="#gallery" className="block px-3 py-2 text-black font-bold hover:text-red-600">Gallery</a>
            <a href="#product" className="block px-3 py-2 text-black font-bold hover:text-red-600">Product</a>
            <a href="#contact" className="block px-3 py-2 bg-red-600 text-white font-bold rounded-md">Contact Us</a>
            <a href="#cart" className="block px-3 py-2 text-black font-bold hover:text-red-600">
              Cart (0)
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;