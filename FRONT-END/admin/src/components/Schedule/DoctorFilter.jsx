import { Stethoscope } from 'lucide-react';

const DoctorFilter = ({ doctors, selectedDoctor, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
        <Stethoscope size={16} />
        Select Doctor
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect('ALL')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
            selectedDoctor === 'ALL'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Doctors
        </button>
        {doctors.map(doctor => (
          <button
            key={doctor.id}
            onClick={() => onSelect(doctor.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              selectedDoctor === doctor.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dr. {doctor.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoctorFilter;