import { Star, MapPin, Clock } from 'lucide-react';

const DoctorInfo = ({ doctor }) => {
  return (
    <div className="bg-blue-50 rounded-xl p-5 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {doctor?.name?.charAt(0) || 'D'}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800">Dr. {doctor?.name}</h2>
          <p className="text-primary font-medium">{doctor?.specialty}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span>{doctor?.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{doctor?.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{doctor?.experience} years exp</span>
            </div>
          </div>
          <p className="text-lg font-bold text-primary mt-2">₱{doctor?.fee} / session</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;