const ScheduleLegend = () => {
  return (
    <div className="flex gap-6 mb-6 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-green-100 border border-green-300 rounded"></div>
        <span className="text-sm text-gray-600">Confirmed Appointment</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-yellow-100 border border-yellow-300 rounded"></div>
        <span className="text-sm text-gray-600">Pending Appointment</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-white border border-gray-300 rounded"></div>
        <span className="text-sm text-gray-600">Available Slot</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-xs">
          ⚡
        </div>
        <span className="text-sm text-gray-600">Click to Book</span>
      </div>
    </div>
  );
};

export default ScheduleLegend;