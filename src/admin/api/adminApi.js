import axios from 'axios';

const adminAxios = axios.create({
  baseURL: 'https://nehmeer-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach admin token
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling auth errors
adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.hash = '/admin/login';
    }
    return Promise.reject(error);
  }
);

const adminApi = {
  // Auth
  login: (credentials) => adminAxios.post('/auth/login', credentials),
  logout: () => adminAxios.post('/auth/logout'),

  // Dashboard
  getDashboardStats: () => adminAxios.get('/dashboard/stats'),

  // Workers
  getWorkers: (params) => adminAxios.post('/profile', { params }),
  getWorkerById: (id) => adminAxios.get(`/profile/${id}`),
  createWorker: (data) => adminAxios.post('/admin/create-worker', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateWorker: (id, data) => adminAxios.put(`/workers/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteWorker: (id) => adminAxios.delete(`/workers/${id}`),
  importWorkers: (formData) => adminAxios.post('/workers/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  exportWorkers: (params) => adminAxios.get('/workers/export', {
    params,
    responseType: 'blob'
  }),

  // Push Notifications
  sendPushNotification: (data) => adminAxios.post('/notifications/send', data),
  getNotificationHistory: (params) => adminAxios.get('/notifications/history', { params }),
  getNotificationById: (id) => adminAxios.get(`/notifications/${id}`),
  cancelScheduledNotification: (id) => adminAxios.delete(`/notifications/${id}`),

  // Settings
  getSettings: () => adminAxios.get('/settings'),
  updateSettings: (data) => adminAxios.put('/settings', data),

  // Users (for notifications targeting)
  getUsers: (params) => adminAxios.get('/users', { params }),
  getUserStats: () => adminAxios.get('/users/stats'),
};

export default adminApi;
