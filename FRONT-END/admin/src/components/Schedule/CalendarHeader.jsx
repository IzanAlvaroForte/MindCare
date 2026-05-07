import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentDate, onPrevWeek, onNextWeek, onToday, weekRange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <button onClick={onPrevWeek} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronLeft size={20} />
          </button>
          <button onClick={onNextWeek} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronRight size={20} />
          </button>
          <button onClick={onToday} className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            Today
          </button>
        </div>
        <h2 className="text-base md:text-lg font-semibold text-gray-800">{weekRange}</h2>
        <div className="hidden md:block w-24"></div>
      </div>
    </div>
  );
};

export default CalendarHeader;