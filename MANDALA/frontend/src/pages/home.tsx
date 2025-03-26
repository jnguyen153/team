import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
