const API_BASE_URL = 'http://localhost:8080/api';

// Helper for authenticated requests
const getToken = () => localStorage.getItem('token');

const authFetch = async (url, options = {}) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

// ========== AUTH APIs ==========
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ========== DOCTOR APIs ==========
export const getDoctors = async () => {
  return authFetch('/doctors');
};

export const getDoctorById = async (id) => {
  return authFetch(`/doctors/${id}`);
};

// ========== APPOINTMENT APIs ==========
export const bookAppointment = async (appointmentData) => {
  return authFetch('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
};

export const getUserAppointments = async () => {
  const user = getCurrentUser();
  if (!user) return [];
  return authFetch(`/appointments/user/${user.id}`);
};

export const cancelAppointment = async (appointmentId) => {
  return authFetch(`/appointments/${appointmentId}/cancel`, {
    method: 'PUT',
  });
};

// ========== DASHBOARD APIs ==========
export const getDashboardStats = async () => {
  const user = getCurrentUser();
  if (!user) return { total: 0, upcoming: 0, completed: 0 };
  return authFetch(`/dashboard/stats/${user.id}`);
};

export const getUpcomingAppointments = async () => {
  const user = getCurrentUser();
  if (!user) return [];
  return authFetch(`/appointments/user/${user.id}/upcoming`);
};

// Change password
export const changePassword = async (passwordData) => {
  const user = getCurrentUser();
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      userId: user?.id,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return await response.json();
};

export const deleteAccount = async () => {
  const user = getCurrentUser();
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/auth/delete-account/${user?.id}`, {
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
  
  return await response.json();
};