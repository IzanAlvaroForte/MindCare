import { ChevronRight } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    { title: 'Counseling', description: 'Personalized support for everyday challenges', icon: '💬' },
    { title: 'Therapy', description: 'Professional therapy for mental wellness', icon: '🧠' },
    { title: 'Psychiatry', description: 'Medical expertise for mental health', icon: '⚕️' },
    { title: '24/7 Support', description: 'Round-the-clock crisis assistance', icon: '🕒' },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive mental health support tailored to your needs
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition group">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <a href="/signupin" className="inline-flex items-center gap-1 text-primary mt-4 font-medium group-hover:gap-2 transition">
                Learn more <ChevronRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;