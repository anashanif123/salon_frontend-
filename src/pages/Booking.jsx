import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { getServices, createBooking } from '../lib/api.js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Booking = ({ user }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    paymentMethod: 'cash',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await getServices();
        setServices(data);
      } catch (error) {
        toast.error('Failed to load services');
      }
    };
    fetchServices();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to book an appointment');
      navigate('/login');
      return;
    }
    console.log('Booking form data:', formData);
    try {
      const { data } = await createBooking(formData);
      if (formData.paymentMethod === 'card') {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        toast.success('Booking created successfully');
        navigate('/booking/success');
      }
    } catch (error) {
      console.error('Booking error:', error.response?.data, error.message);
      toast.error(error.response?.data?.message || 'Failed to create booking');
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
        Book an Appointment
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="card"
        style={{ maxWidth: '400px', margin: '0 auto', padding: '24px' }}
      >
        <div>
          <label>Service</label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>
                {service.name} (${service.price})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn"
        >
          Book Now
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Booking;
