import { Calendar, Clock } from 'lucide-react';

const DateTimeSelector = ({ selectedDate, selectedTime, onDateChange, onTimeChange }) => {
  // Generate next 7 days
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        isToday: i === 0,
      });
    }
    return dates;
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const availableDates = getAvailableDates();

  return (
    <div className="space-y-5">
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Calendar size={16} /> Select Date
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
          {availableDates.map((date) => (
            <button
              key={date.value}
              onClick={() => onDateChange(date.value)}
              className={`p-2 rounded-lg text-sm font-medium transition ${
                selectedDate === date.value
                  ? 'bg-primary text-white'
                  : date.isToday
                  ? 'bg-gray-100 text-gray-700 border border-gray-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="text-center">
                <div className="text-xs">{date.label.split(' ')[0]}</div>
                <div className="text-lg font-bold">{date.label.split(' ')[1]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Clock size={16} /> Select Time
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => onTimeChange(time)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                selectedTime === time
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;