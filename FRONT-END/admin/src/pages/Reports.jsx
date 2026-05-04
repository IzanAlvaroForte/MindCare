import { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, Clock, Calendar } from 'lucide-react';  // ← Add Calendar here
import { reportMockData } from '../data/reportMockData';
import StatCard from '../components/Reports/StatCard';
import DateRangeFilter from '../components/Reports/DateRangeFilter';
import ExportButtons from '../components/Reports/ExportButtons';
import AppointmentsByStatusChart from '../components/Reports/AppointmentsByStatusChart';
import TopDoctorsTable from '../components/Reports/TopDoctorsTable';
import MonthlyTrendChart from '../components/Reports/MonthlyTrendChart';
import RecentActivityTable from '../components/Reports/RecentActivityTable';

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReportData();
  }, [dateRange]);

  const loadReportData = () => {
    setLoading(true);
    setTimeout(() => {
      setReportData(reportMockData);
      setLoading(false);
    }, 500);
  };

  const handleExport = (format) => {
    const data = {
      generatedAt: new Date().toISOString(),
      dateRange,
      ...reportData
    };
    
    if (format === 'JSON') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${dateRange.startDate}-to-${dateRange.endDate}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'CSV') {
      const csv = [
        ['Metric', 'Value'],
        ['Total Appointments', reportData?.summary.totalAppointments],
        ['Total Users', reportData?.summary.totalUsers],
        ['Total Doctors', reportData?.summary.totalDoctors],
        ['Total Revenue', `₱${reportData?.summary.totalRevenue}`],
        ['Completion Rate', `${reportData?.summary.completionRate}%`],
        ['Cancellation Rate', `${reportData?.summary.cancellationRate}%`]
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `summary-report-${dateRange.startDate}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500">View insights and export data</p>
        </div>
        <ExportButtons onExport={handleExport} />
      </div>

      <DateRangeFilter 
        dateRange={dateRange}
        onDateChange={(key, value) => setDateRange({ ...dateRange, [key]: value })}
        onApply={loadReportData}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Appointments" value={reportData?.summary.totalAppointments} icon={Calendar} color="bg-blue-500" />
        <StatCard title="Total Users" value={reportData?.summary.totalUsers} icon={Users} color="bg-green-500" />
        <StatCard title="Total Revenue" value={reportData?.summary.totalRevenue} icon={DollarSign} color="bg-purple-500" prefix="₱" />
        <StatCard title="Avg. Rating" value={reportData?.summary.averageRating} icon={TrendingUp} color="bg-yellow-500" suffix="★" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AppointmentsByStatusChart data={reportData?.appointmentsByStatus} />
        <MonthlyTrendChart data={reportData?.monthlyTrend} />
      </div>

      <div className="mb-8">
        <TopDoctorsTable doctors={reportData?.topDoctors} />
      </div>

      <div className="mb-8">
        <RecentActivityTable activities={reportData?.recentActivity} />
      </div>
    </div>
  );
};

export default Reports;