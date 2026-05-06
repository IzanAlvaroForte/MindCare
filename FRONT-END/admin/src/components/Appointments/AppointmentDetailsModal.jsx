import { X, Calendar, Clock, User, Stethoscope, Mail, Phone, FileText } from 'lucide-react';
import AppointmentStatusBadge from './AppointmentStatusBadge';

const AppointmentDetailsModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Appointment Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-semibold">{appointment?.patientName}</p>
                <p className="text-sm text-gray-600">{appointment?.patientEmail}</p>
                <p className="text-sm text-gray-600">{appointment?.patientPhone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Stethoscope className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-semibold">{appointment?.doctorName}</p>
                <p className="text-sm text-gray-600">{appointment?.doctorSpecialty}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{appointment?.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold">{appointment?.time}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="text-gray-400 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-500">Reason for Visit</p>
              <p className="text-gray-700">{appointment?.reason || 'No reason provided'}</p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <AppointmentStatusBadge status={appointment?.status} />
              </div>
              <p className="text-sm text-gray-500">Booking ID: #{appointment?.id}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t">
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
            Close
          </button>
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Send Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;