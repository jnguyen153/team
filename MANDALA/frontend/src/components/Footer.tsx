import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Red & White Hair Salon</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                123 Style Street, Fashion City
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                (555) 123-4567
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                info@redandwhitesalon.com
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Hours</h3>
            <div className="space-y-2">
              <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p>Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Red & White Hair Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;