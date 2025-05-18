import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getBookings, getUsers, createService, updateService, deleteService } from '../lib/api.js';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', price: '', duration: '' });
  const [editingServiceId, setEditingServiceId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, usersRes] = await Promise.all([getBookings(), getUsers()]);
        setBookings(bookingsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        toast.error('Failed to load admin data');
      }
    };
    fetchData();
  }, []);

  const handleServiceSubmit = async e => {
    e.preventDefault();
    try {
      if (editingServiceId) {
        await updateService(editingServiceId, serviceForm);
        toast.success('Service updated');
      } else {
        await createService(serviceForm);
        toast.success('Service created');
      }
      setServiceForm({ name: '', description: '', price: '', duration: '' });
      setEditingServiceId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save service');
    }
  };

  const handleDeleteService = async id => {
    try {
      await deleteService(id);
      toast.success('Service deleted');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
      style={{ padding: '64px 0' }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '40px', textAlign: 'center', marginBottom: '32px' }}
      >
        Admin Dashboard
      </motion.h1>
      <div className="grid">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Manage Services</h2>
          <form onSubmit={handleServiceSubmit} className="card" style={{ padding: '24px' }}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={serviceForm.name}
                onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={serviceForm.description}
                onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={serviceForm.price}
                onChange={e => setServiceForm({ ...serviceForm, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={serviceForm.duration}
                onChange={e => setServiceForm({ ...serviceForm, duration: e.target.value })}
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn"
            >
              {editingServiceId ? 'Update Service' : 'Add Service'}
            </motion.button>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Bookings</h2>
          <div className="card" style={{ padding: '16px' }}>
            {bookings.map(booking => (
              <div key={booking._id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
                <p>
                  {booking.service?.name} by {booking.user?.name} on {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </p>
                <p style={{ color: '#666', fontSize: '14px' }}>Status: {booking.paymentStatus}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

