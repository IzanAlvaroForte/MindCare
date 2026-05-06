const TopDoctorsTable = ({ doctors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Top Performing Doctors</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appointments</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.map((doctor, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{doctor.name}</td>
                <td className="px-4 py-3">{doctor.appointments}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">₱{doctor.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDoctorsTable;