import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use env variable here
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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