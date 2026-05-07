// import { useState } from 'react';
// import { X } from 'lucide-react';

// const AppointmentModal = ({ isOpen, onClose, slot, doctors, onSchedule }) => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     patientEmail: '',
//     patientPhone: '',
//     doctorId: '',
//     reason: ''
//   });

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));
//     onSchedule({
//       ...formData,
//       doctorName: selectedDoctor?.name,
//       doctorSpecialty: selectedDoctor?.specialty,
//       date: slot?.day?.date,
//       time: slot?.time,
//       status: 'PENDING'
//     });
//     setFormData({
//       patientName: '',
//       patientEmail: '',
//       patientPhone: '',
//       doctorId: '',
//       reason: ''
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-xl font-bold">Schedule Appointment</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div className="bg-gray-50 p-3 rounded-lg mb-2">
//             <p className="text-sm text-gray-600">Date: <span className="font-semibold">{slot?.day?.date}</span></p>
//             <p className="text-sm text-gray-600">Time: <span className="font-semibold">{slot?.time}</span></p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
//             <input
//               type="text"
//               required
//               value={formData.patientName}
//               onChange={(e) => setFormData({...formData, patientName: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//             <input
//               type="email"
//               required
//               value={formData.patientEmail}
//               onChange={(e) => setFormData({...formData, patientEmail: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
//             <input
//               type="tel"
//               required
//               value={formData.patientPhone}
//               onChange={(e) => setFormData({...formData, patientPhone: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor *</label>
//             <select
//               required
//               value={formData.doctorId}
//               onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Choose a doctor</option>
//               {doctors.map(doctor => (
//                 <option key={doctor.id} value={doctor.id}>
//                   {doctor.name} - {doctor.specialty}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
//             <textarea
//               rows={3}
//               value={formData.reason}
//               onChange={(e) => setFormData({...formData, reason: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
//               Cancel
//             </button>
//             <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Schedule
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AppointmentModal;