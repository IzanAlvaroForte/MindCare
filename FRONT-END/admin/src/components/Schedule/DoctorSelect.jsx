const DoctorSelect = ({ doctors, selectedDoctor, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelect('ALL')}
          className={`px-4 py-2 rounded-lg transition ${
            selectedDoctor === 'ALL'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Doctors
        </button>
        {doctors.map(doctor => (
          <button
            key={doctor.id}
            onClick={() => onSelect(doctor.id)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedDoctor === doctor.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="font-medium">{doctor.name}</span>
            <span className="text-xs ml-1 text-gray-500">({doctor.specialty})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelect;