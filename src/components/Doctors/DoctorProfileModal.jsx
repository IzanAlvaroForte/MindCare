const DoctorProfileModal = ({ doctor, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBookAppointment = () => {
    onClose();
    alert(`Booking appointment with ${doctor.name}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        <div className="sticky top-0 bg-white flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialty} | {doctor.experience} yr experience</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">🎓 Education</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-700">Master's in Clinical Psychology</p>
                <p className="text-gray-600">Ateneo de Manila University, 2023</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Bachelor's in Psychology</p>
                <p className="text-gray-600">University of Santo Tomas, 2020</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">🤝 Affiliations</h3>
            <div className="space-y-2">
              <p className="text-gray-700">• Philippine Psychological Association (PPA)</p>
              <p className="text-gray-700">• Association of Counselors in the Philippines (ACP)</p>
              <p className="text-gray-700">• Mental Health Philippines Network</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">🏅 Badges & Certifications</h3>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Licensed Counselor (PRC)</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">CBT Certified</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Trauma-Informed Care</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Top Rated 2025</span>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Mental Health First Aider</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">❓ Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800">How long is each session?</p>
                <p className="text-gray-600">Each session typically lasts 45-60 minutes depending on your needs.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Do you accept HMO or insurance?</p>
                <p className="text-gray-600">Currently accepting cash and GCash payments. HMO integration coming soon.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">What platforms do you use for online consultation?</p>
                <p className="text-gray-600">We use Zoom and Google Meet for online sessions. A link will be sent upon booking.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Can I cancel or reschedule?</p>
                <p className="text-gray-600">Yes, cancellations must be made at least 24 hours before the schedule.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white flex gap-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition">
            Close
          </button>
          <button onClick={handleBookAppointment} className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;