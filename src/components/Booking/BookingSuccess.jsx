import { CheckCircle, Calendar, Clock, Stethoscope } from 'lucide-react';

const BookingSuccess = ({ bookingDetails, onClose }) => {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={40} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-500 mb-6">Your appointment has been successfully scheduled.</p>

      <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
        <p className="text-sm text-gray-600">Appointment Details:</p>
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2 text-sm">
            <Stethoscope size={14} className="text-primary" />
            <span>Dr. {bookingDetails?.doctorName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-primary" />
            <span>{bookingDetails?.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} className="text-primary" />
            <span>{bookingDetails?.time}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <a href="/my-appointments" className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90">
          View My Appointments
        </a>
        <button onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;