import { Calendar, Clock, Stethoscope, DollarSign } from 'lucide-react';

const BookingSummary = ({ doctor, selectedDate, selectedTime, formData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-5 sticky top-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Stethoscope size={18} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Doctor</p>
            <p className="font-medium">Dr. {doctor?.name}</p>
            <p className="text-sm text-gray-500">{doctor?.specialty}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar size={18} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{selectedDate ? formatDate(selectedDate) : 'Not selected'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock size={18} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">{selectedTime || 'Not selected'}</p>
          </div>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex items-start gap-3">
            <DollarSign size={18} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p className="text-xl font-bold text-primary">₱{doctor?.fee}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-gray-600">
          ⚠️ Please arrive 10 minutes before your scheduled time. 
          Cancellations must be made at least 24 hours in advance.
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;