import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentDate, onPrevWeek, onNextWeek, onToday }) => {
  const getWeekRange = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(start.setDate(diff));
    const sunday = new Date(start.setDate(diff + 6));
    
    return `${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2">
        <button 
          onClick={onPrevWeek}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={onNextWeek}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronRight size={20} />
        </button>
        <button 
          onClick={onToday}
          className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          Today
        </button>
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{getWeekRange(currentDate)}</h2>
      <div className="w-24"></div>
    </div>
  );
};

export default CalendarHeader;