import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import GalleryPreview from '../components/GalleryPreview';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        // Optional: clear history state to avoid scrolling again on back
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <GalleryPreview />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;

