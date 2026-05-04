const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img src="/PICS/pictures/LOGO_1.png" alt="Logo" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-gray-400 text-sm">Your trusted partner in mental wellness</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="/signupin" className="hover:text-white transition">Get Started</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: hello@mindcare.com</li>
              <li>Phone: (02) 1234 5678</li>
              <li>24/7 Helpline: 123-456-7890</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">FB</a>
              <a href="#" className="text-gray-400 hover:text-white transition">IG</a>
              <a href="#" className="text-gray-400 hover:text-white transition">TW</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 MindCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;