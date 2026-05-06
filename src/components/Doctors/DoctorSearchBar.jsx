import { Search, Filter, Plus } from 'lucide-react';

const DoctorSearchBar = ({ searchTerm, onSearchChange, onAddDoctor, onFilter }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, specialty, or license..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select 
          onChange={(e) => onFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Specialties</option>
          <option value="Counselor">Counselor</option>
          <option value="Psychologist">Psychologist</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Psychometrician">Psychometrician</option>
        </select>
        
        <button 
          onClick={onAddDoctor}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Doctor
        </button>
      </div>
    </div>
  );
};

export default DoctorSearchBar;