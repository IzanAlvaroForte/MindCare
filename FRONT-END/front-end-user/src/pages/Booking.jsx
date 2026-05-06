import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Stethoscope } from 'lucide-react';
import { bookAppointment, getCurrentUser, getDoctorById } from '../services/api';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doctorId = searchParams.get('doctorId');
  const doctorName = searchParams.get('doctorName');
  const fee = searchParams.get('fee');

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = getCurrentUser();
    if (!user) {
      navigate('/signupin');
      return;
    }

    try {
      await bookAppointment({
        userId: user.id,
        doctorId: parseInt(doctorId),
        date: formData.date,
        time: formData.time,
        reason: formData.reason
      });
      alert('Appointment booked successfully!');
      navigate('/my-appointments');
    } catch (err) {
      setError('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Appointment</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold">Doctor: {doctorName}</p>
            <p className="text-gray-600">Fee: ₱{fee}</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Calendar size={16} /> Date
              </label>
              <input
                type="date"
                min={today}
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Clock size={16} /> Time
              </label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Select time slot</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Stethoscope size={16} /> Reason for Visit
              </label>
              <textarea
                rows="3"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Briefly describe your concerns..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;