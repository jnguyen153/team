import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import BookingForm from '../components/BookingForm';
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
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Home;
