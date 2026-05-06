export const reportMockData = {
  summary: {
    totalAppointments: 245,
    totalUsers: 1280,
    totalDoctors: 12,
    totalRevenue: 85750,
    averageRating: 4.8,
    cancellationRate: 8.5,
    completionRate: 86
  },
  appointmentsByStatus: [
    { status: 'Confirmed', count: 142, color: '#10b981' },
    { status: 'Pending', count: 38, color: '#f59e0b' },
    { status: 'Completed', count: 52, color: '#3b82f6' },
    { status: 'Cancelled', count: 13, color: '#ef4444' }
  ],
  topDoctors: [
    { name: 'Dr. Samantha Sanchez', appointments: 45, revenue: 15750 },
    { name: 'Dr. John Reyes', appointments: 38, revenue: 19000 },
    { name: 'Dr. Maria Santos', appointments: 32, revenue: 12800 }
  ],
  monthlyTrend: [
    { month: 'Jan', appointments: 180, revenue: 63000 },
    { month: 'Feb', appointments: 195, revenue: 68250 },
    { month: 'Mar', appointments: 210, revenue: 73500 },
    { month: 'Apr', appointments: 245, revenue: 85750 }
  ],
  recentActivity: [
    { date: '2024-05-04', action: 'New appointment booked', user: 'John Doe', doctor: 'Dr. Samantha Sanchez' },
    { date: '2024-05-04', action: 'Appointment confirmed', user: 'Jane Smith', doctor: 'Dr. John Reyes' },
    { date: '2024-05-03', action: 'Appointment completed', user: 'Mike Brown', doctor: 'Dr. Maria Santos' }
  ]
};