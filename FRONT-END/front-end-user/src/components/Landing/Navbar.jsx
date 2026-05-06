import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <img src="/PICS/pictures/LOGO_1.png" alt="Logo" className={`h-10 md:h-12 transition-all ${scrolled ? 'h-8 md:h-10' : 'h-10 md:h-12'}`} />
        <div className="hidden md:flex gap-8 items-center">
          <a href="#home" className="text-gray-700 hover:text-primary transition">Home</a>
          <a href="#services" className="text-gray-700 hover:text-primary transition">Services</a>
          <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
          <a href="/signupin" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;