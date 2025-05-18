import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-salon-kappa.vercel.app/api',
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Response interceptor
api.interceptors.response.use(response => response, error => {
  console.error('API request failed:', error.message);
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  }
  return Promise.reject(error);
});

export const login = data => api.post('/auth/login', data);
export const register = data => api.post('/auth/register', data);
export const getServices = () => api.get('/services');
export const createService = data => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = id => api.delete(`/services/${id}`);
export const createBooking = data => api.post('/bookings', data);
export const getBookings = () => api.get('/admin/bookings');
export const getUsers = () => api.get('/admin/users');
export const getDeals = () => api.get('/deals');