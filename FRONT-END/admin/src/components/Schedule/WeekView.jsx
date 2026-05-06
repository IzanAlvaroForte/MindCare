import { Clock } from 'lucide-react';

const WeekView = ({ weekDays, timeSlots, appointments, onTimeSlotClick }) => {
  const getAppointmentForSlot = (day, time) => {
    return appointments.find(apt => apt.date === day.date && apt.time === time);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Week Days Header */}
        <div className="grid grid-cols-8 border-b">
          <div className="p-3 bg-gray-50 border-r"></div>
          {weekDays.map((day, idx) => (
            <div key={idx} className={`p-3 text-center bg-gray-50 ${idx !== 6 ? 'border-r' : ''}`}>
              <p className="font-semibold">{day.name}</p>
              <p className={`text-sm ${day.isToday ? 'bg-blue-600 text-white inline-block px-2 py-1 rounded-full' : 'text-gray-500'}`}>
                {day.date}
              </p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {timeSlots.map((time, timeIdx) => (
          <div key={timeIdx} className="grid grid-cols-8 border-b hover:bg-gray-50">
            <div className="p-3 bg-gray-50 border-r flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">{time}</span>
            </div>
            {weekDays.map((day, dayIdx) => {
              const appointment = getAppointmentForSlot(day, time);
              return (
                <div 
                  key={dayIdx}
                  onClick={() => onTimeSlotClick(day, time)}
                  className={`p-2 min-h-[80px] border-r cursor-pointer transition ${
                    appointment 
                      ? appointment.status === 'CONFIRMED' 
                        ? 'bg-green-50 hover:bg-green-100' 
                        : 'bg-yellow-50 hover:bg-yellow-100'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {appointment && (
                    <div className="text-xs">
                      <p className="font-semibold">{appointment.patientName}</p>
                      <p className="text-gray-500">{appointment.doctorName}</p>
                      <span className={`inline-block mt-1 px-1 py-0.5 rounded text-xs ${
                        appointment.status === 'CONFIRMED' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;