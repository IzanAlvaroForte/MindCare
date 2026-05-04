import Header from '../components/Layout/Header';
import ServiceCard from '../components/Services/ServiceCard';

const Services = () => {
  const services = [
    { title: "Counselor", description: "Stress, school problems, relationship issues and mild emotional struggles", tag: "Guidance & support" },
    { title: "Psychometrician", description: "IQ Test, Personality Test, Career Assessment and mental health screenings", tag: "Test and Evaluation" },
    { title: "Psychologist", description: "Anxiety, depression, trauma, and other mental health conditions", tag: "Therapy & counseling (No medications)" },
    { title: "Clinical Psychologist", description: "Complex conditions -- deep assessment, diagnosis, and treatment for severe mental illnesses", tag: "Specialized therapy" },
    { title: "Psychiatrist", description: "Severe cases -- panic attacks, suicidal thoughts, psychosis, and medication management", tag: "Medical diagnosis" }
  ];

  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      
      <main className="h-full w-full p-6 gap-4 flex flex-col">
        <p className="text-3xl text-primary font-bold">MENTAL HEALTH SERVICES</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              tag={service.tag}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Services;