import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getServices } from '../lib/api.js';
import ServiceCard from '../components/ServiceCard.jsx';

const Services = () => {
  const [services, setServices] = useState([]);

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
        Our Services
      </motion.h1>
      <div className="grid">
        {services.map(service => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
