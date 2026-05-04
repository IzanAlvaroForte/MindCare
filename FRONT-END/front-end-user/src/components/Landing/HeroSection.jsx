import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import StatsSection from './StatsSection';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white pt-16">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
              <Shield size={16} />
              <span className="text-sm font-semibold">Trusted by 2,000+ patients</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Mental Health Journey Starts with{' '}
              <span className="text-primary">One Conversation</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Book appointments with licensed therapists and counselors - online or in person.
              Private, secure, and judgment-free support whenever you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/signupin" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2 group">
                Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </a>
              <a href="#services" className="border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary/10 transition text-center">
                Learn More
              </a>
            </div>
            <StatsSection />
          </div>
          
          {/* Right side */}
          <div className="relative hidden md:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="public/PICS/pictures/home_page_2.png" alt="Mental Health" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Available 24/7</p>
                  <p className="text-xs text-gray-500">Book anytime, anywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;