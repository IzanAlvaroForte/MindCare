const ServiceCard = ({ title, description, tag }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
        {tag}
      </span>
      <a href="/booking" className="inline-block mt-4 text-primary font-medium hover:underline">
        Book a session →
      </a>
    </div>
  );
};

export default ServiceCard;