import { X, Star, MapPin, Clock, GraduationCap, Award } from 'lucide-react';

const DoctorProfileModal = ({ doctor, isOpen, onClose, onBook }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dr. {doctor.name}</h2>
            <p className="text-primary font-medium">{doctor.specialty}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Rating & Experience */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{doctor.rating}</span>
              <span className="text-gray-500">(124 reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-gray-400" />
              <span>{doctor.experience} years experience</span>
            </div>
          </div>

          {/* Location & Availability */}
          <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-400" />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-400" />
              <span>Available: {doctor.availability}</span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <GraduationCap size={18} /> Education
            </h3>
            <p className="text-gray-600">Master's in Clinical Psychology - Ateneo de Manila University</p>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <Award size={18} /> Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.specializations?.map((spec, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Fee */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="text-2xl font-bold text-primary">₱{doctor.fee}</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBook(doctor);
                }}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;