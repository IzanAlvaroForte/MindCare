import { X, AlertTriangle } from 'lucide-react';

const CancelModal = ({ isOpen, onClose, onConfirm, appointment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Cancel Appointment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <p className="text-gray-700">
              Are you sure you want to cancel your appointment with <strong>Dr. {appointment?.doctorName}</strong>?
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone. Cancellations must be made at least 24 hours before the scheduled time.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Keep Appointment
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;