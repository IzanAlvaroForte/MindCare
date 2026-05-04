import { MapPin, Calendar, Star, Clock } from 'lucide-react';

const DoctorCard = ({ doctor, onViewProfile, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Dr. {doctor.name}</h3>
            <p className="text-primary font-medium mt-1">{doctor.specialty}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{doctor.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">{doctor.experience} years exp</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">₱{doctor.fee}</p>
            <p className="text-xs text-gray-500">per session</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span>{doctor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>{doctor.availability}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => onViewProfile(doctor)}
            className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium"
          >
            View Profile
          </button>
          <button
            onClick={() => onBook(doctor)}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;