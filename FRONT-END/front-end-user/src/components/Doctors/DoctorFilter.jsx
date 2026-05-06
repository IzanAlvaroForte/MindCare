const DoctorFilter = ({ selectedSpecialty, onSpecialtyChange }) => {
  const specialties = ['All', 'Counselor', 'Psychologist', 'Psychiatrist', 'Psychometrician'];

  return (
    <div className="flex flex-wrap gap-2">
      {specialties.map((specialty) => (
        <button
          key={specialty}
          onClick={() => onSpecialtyChange(specialty)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedSpecialty === specialty
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {specialty}
        </button>
      ))}
    </div>
  );
};

export default DoctorFilter;