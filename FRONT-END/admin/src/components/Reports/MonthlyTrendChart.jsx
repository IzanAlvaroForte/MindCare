import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';

const MonthlyTrendChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Monthly Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="appointments" fill="#3b82f6" name="Appointments" />
          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue (₱)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;