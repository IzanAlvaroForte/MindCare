import { useState, useEffect } from 'react';
import { getUserAppointments, cancelAppointment } from '../services/api';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getUserAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      await cancelAppointment(id);
      loadAppointments();
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No appointments yet</p>
          <a href="/doctors" className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg">Book Now</a>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-xl shadow-md p-5">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Stethoscope className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Dr. {apt.doctor.name}</h3>
                    <p className="text-gray-500">{apt.doctor.specialty}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {apt.appointmentDate}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {apt.appointmentTime}</span>
                    </div>
                    {apt.reason && <p className="text-sm text-gray-500 mt-2">Reason: {apt.reason}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                  {(apt.status === 'PENDING' || apt.status === 'CONFIRMED') && (
                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="block mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;