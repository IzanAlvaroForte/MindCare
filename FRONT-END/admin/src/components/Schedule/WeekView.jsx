import { User, Calendar } from 'lucide-react';

const WeekView = ({ weekDays, timeSlots, appointments, selectedDoctor, formatTime }) => {
  
  console.log('WeekView received appointments:', appointments);
  console.log('WeekView received weekDays:', weekDays);

  const getAppointmentForSlot = (day, time) => {
    // Find appointment that matches this day and time
    const found = appointments.find(apt => {
      const aptDate = apt.appointmentDate || apt.date;
      const aptTime = apt.appointmentTime || apt.time;
      // Convert time to match format (remove seconds if needed)
      const aptTimeShort = aptTime?.substring(0, 5);
      return aptDate === day.date && (aptTimeShort === time || aptTime === time);
    });
    if (found) {
      console.log(`Found appointment at ${day.date} ${time}:`, found.status);
    }
    return found;
  };

  const getSlotStyle = (status) => {
    switch(status) {
      case 'CONFIRMED': return { backgroundColor: '#dcfce7', borderLeft: '3px solid #22c55e' };
      case 'PENDING': return { backgroundColor: '#fef9c3', borderLeft: '3px solid #eab308' };
      case 'COMPLETED': return { backgroundColor: '#dbeafe', borderLeft: '3px solid #3b82f6' };
      case 'CANCELLED': return { backgroundColor: '#fee2e2', borderLeft: '3px solid #ef4444' };
      default: return { backgroundColor: 'white' };
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'CONFIRMED': return { backgroundColor: '#22c55e', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' };
      case 'PENDING': return { backgroundColor: '#eab308', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' };
      case 'COMPLETED': return { backgroundColor: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' };
      case 'CANCELLED': return { backgroundColor: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' };
      default: return { backgroundColor: '#9ca3af', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' };
    }
  };

  // If no appointments, show a message
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
        No appointments found. Book some appointments through the user portal.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b bg-gray-50">
            <div className="p-3 text-center border-r">
              <span className="text-sm font-medium text-gray-500">Time</span>
            </div>
            {weekDays.map((day, idx) => (
              <div key={idx} className={`p-3 text-center ${idx !== 6 ? 'border-r' : ''}`}>
                <p className="text-sm font-semibold text-gray-800">{day.name}</p>
                <p className={`text-xs mt-1 ${day.isToday ? 'bg-blue-600 text-white inline-block px-2 py-0.5 rounded-full' : 'text-gray-500'}`}>
                  {day.date}
                </p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((time, timeIdx) => (
            <div key={timeIdx} className="grid grid-cols-8 border-b hover:bg-gray-50">
              <div className="p-2 text-center border-r bg-gray-50">
                <span className="text-xs text-gray-600">{formatTime(time)}</span>
              </div>
              {weekDays.map((day, dayIdx) => {
                const appointment = getAppointmentForSlot(day, time);
                const slotStyle = appointment ? getSlotStyle(appointment.status) : { backgroundColor: 'white' };
                const badgeStyle = appointment ? getStatusBadgeStyle(appointment.status) : null;
                const statusText = appointment ? 
                  (appointment.status === 'CONFIRMED' ? 'Confirmed' :
                   appointment.status === 'PENDING' ? 'Pending' :
                   appointment.status === 'COMPLETED' ? 'Completed' :
                   appointment.status === 'CANCELLED' ? 'Cancelled' : appointment.status) 
                  : '';
                
                return (
                  <div
                    key={dayIdx}
                    className="p-1 min-h-[70px] border-r relative group"
                    style={slotStyle}
                  >
                    {appointment ? (
                      <div className="h-full flex flex-col justify-between p-1">
                        <div className="text-xs space-y-0.5">
                          <div className="flex items-center gap-1">
                            <User size={10} className="text-gray-500 shrink-0" />
                            <span className="font-medium text-xs truncate" style={{ maxWidth: '80px' }}>
                              {appointment.user?.username || appointment.patientName || 'Patient'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={10} className="text-gray-500 shrink-0" />
                            <span className="text-[10px] truncate">
                              {appointment.appointmentDate || appointment.date}
                            </span>
                          </div>
                          <div className="mt-1">
                            <span style={badgeStyle}>
                              {statusText}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-[10px] text-gray-300">—</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;