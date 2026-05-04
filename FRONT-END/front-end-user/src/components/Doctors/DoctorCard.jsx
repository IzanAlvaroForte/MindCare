import { useState } from 'react';
import DoctorProfileModal from './DoctorProfileModal';

const DoctorCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const doctor = {
    name: "Dr. Samantha Marie Sanchez",
    specialty: "Counselor",
    experience: 1,
    clinic: "Online Clinic",
    schedule: "Today, 08:00 AM - 10:00 PM",
    fee: 350.00
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 w-full">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <p className="text-sm text-gray-500">{doctor.experience} yr experience</p>
            <div className="flex gap-4 mt-2">
              <span className="text-green-600 text-sm">✔ Online Consultation</span>
              <span className="text-red-600 text-sm">✖ In-Person Consultation</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-semibold text-gray-700">Earliest Available Schedule</p>
            <p className="text-sm text-gray-600">{doctor.clinic}</p>
            <p className="text-sm text-gray-600">{doctor.schedule}</p>
            <div className="mt-2">
              <p className="text-lg font-bold text-blue-600">Fee: ₱{doctor.fee}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              BOOK APPOINTMENT
            </button>
            <button 
              onClick={openModal}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              VIEW PROFILE
            </button>
          </div>
        </div>
      </div>

      <DoctorProfileModal doctor={doctor} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default DoctorCard;