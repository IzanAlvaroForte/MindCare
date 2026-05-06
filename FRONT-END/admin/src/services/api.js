// Mock API (temporary until Spring Boot is ready)
const USE_MOCK = true;  // Change to false when Spring Boot is ready

export const dashboardAPI = {
  getStats: async () => {
    if (USE_MOCK) {
      return {
        totalUsers: 1247,
        totalDoctors: 45,
        totalAppointments: 892,
        todayAppointments: 23,
        pendingAppointments: 12,
        completedAppointments: 678,
        cancelledAppointments: 89
      };
    }
    
    const response = await fetch('http://localhost:8080/api/admin/dashboard/stats', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
  },
  
  getRecentAppointments: async () => {
    if (USE_MOCK) {
      return [
        { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', date: '2024-05-04', time: '10:00 AM', status: 'CONFIRMED' },
        { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. Johnson', date: '2024-05-04', time: '11:30 AM', status: 'PENDING' },
        { id: 3, patientName: 'Mike Brown', doctorName: 'Dr. Williams', date: '2024-05-04', time: '02:00 PM', status: 'CONFIRMED' },
        { id: 4, patientName: 'Sarah Lee', doctorName: 'Dr. Garcia', date: '2024-05-03', time: '09:00 AM', status: 'COMPLETED' },
      ];
    }
    
    const response = await fetch('http://localhost:8080/api/admin/appointments/recent', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
  },
  
  getChartData: async () => {
    if (USE_MOCK) {
      return [
        { date: '04/28', appointments: 15, revenue: 5250 },
        { date: '04/29', appointments: 22, revenue: 7700 },
        { date: '04/30', appointments: 18, revenue: 6300 },
        { date: '05/01', appointments: 25, revenue: 8750 },
        { date: '05/02', appointments: 20, revenue: 7000 },
        { date: '05/03', appointments: 28, revenue: 9800 },
        { date: '05/04', appointments: 23, revenue: 8050 },
      ];
    }
    
    const response = await fetch('http://localhost:8080/api/admin/dashboard/chart', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
  }
};