const API_BASE_URL = 'http://localhost:8080/api';

// Helper functions
const getToken = () => localStorage.getItem('token');

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ========== AUTH APIs ==========
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/admin/login';
};

// ========== DASHBOARD APIs ==========
export const getDashboardStats = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  
  return response.json();
};

export const getRecentAppointments = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/appointments/recent`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch recent appointments');
  }
  
  return response.json();
};

// ======
// ==== USER MANAGEMENT APIs ==========
export const getUsers = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
};

export const getUserById = async (id) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  
  return response.json();
};

export const createUser = async (userData) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      username: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      status: userData.status,
      password: 'default123' // Add a default password
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

export const updateUser = async (id, userData) => {
  const token = getToken();
  
  // Only send fields that are provided
  const requestBody = {};
  if (userData.name) requestBody.username = userData.name;
  if (userData.email) requestBody.email = userData.email;
  if (userData.phone) requestBody.phone = userData.phone;
  if (userData.role) requestBody.role = userData.role;
  if (userData.status) requestBody.status = userData.status;
  
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

export const deleteUser = async (id) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

// ========== DOCTOR MANAGEMENT APIs ==========
export const getDoctors = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/doctors`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch doctors');
  }
  
  return response.json();
};

export const getDoctorById = async (id) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/doctors/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch doctor');
  }
  
  return response.json();
};

export const createDoctor = async (doctorData) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/doctors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(doctorData)
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

export const updateDoctor = async (id, doctorData) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/doctors/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(doctorData)
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

export const deleteDoctor = async (id) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/doctors/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

// ========== APPOINTMENT MANAGEMENT APIs ==========
export const getAllAppointments = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/appointments`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch appointments');
  }
  
  const data = await response.json();
  console.log('Appointments from backend:', data); // ← Add this to debug
  return data;
};

export const updateAppointmentStatus = async (id, status) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

export const deleteAppointment = async (id) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

// ========== REPORTS APIs ==========
export const getReportsStats = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/reports/stats`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch reports stats');
  }
  
  return response.json();
};

export const getAppointmentsByStatus = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/reports/status`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch status data');
  }
  
  return response.json();
};

export const getTopDoctors = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/reports/top-doctors`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch top doctors');
  }
  
  return response.json();
};

export const getMonthlyTrend = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/reports/monthly-trend`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch monthly trend');
  }
  
  return response.json();
};

export const getRecentActivities = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/reports/activities`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }
  
  return response.json();
};

// ========== SETTINGS APIs ==========
export const getAdminProfile = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/profile`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  
  return response.json();
};

export const updateAdminProfile = async (profileData) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();  // This will include token if username changed
};

export const getNotificationSettings = async () => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/notifications`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch notification settings');
  }
  
  return response.json();
};

export const updateNotificationSettings = async (notifications) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/admin/notifications`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(notifications)
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};