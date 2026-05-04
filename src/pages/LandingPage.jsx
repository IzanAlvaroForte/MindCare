import Navbar from '../components/Landing/Navbar';
import HeroSection from '../components/Landing/HeroSection';
import ServicesSection from '../components/Landing/ServicesSection';
import Footer from '../components/Landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;