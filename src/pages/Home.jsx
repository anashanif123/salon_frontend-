import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
// import axios from 'axios';
import api from '../lib/api.js';
import TestimonialCard from '../components/TestimonialCard.jsx';

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The best salon experience! My hair looks amazing.',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=200&h=200'
  },
  {
    name: 'Emma L.',
    text: 'Loved the facial treatment. My skin feels rejuvenated!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrK1mN2CRoOHxyrF9OP_vxuzUklZnr58P1ZQ&s'
  },
  {
    name: 'Olivia R.',
    text: 'Perfect bridal makeup. They made my day unforgettable!',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/047/906/907/small/serene-beauty-young-woman-with-striking-eyes-photo.jpg'
  },
];

const Home = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await api.get('/deals');
        console.log('API response:', response.data);
        setDeals(response.data);
        controls.start({ opacity: 1, y: 0 });
      } catch (error) {
        console.error('Error fetching deals:', error.message);
        setDeals([]); // Ensure deals is empty on error
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, [controls]);

  const currentDate = new Date('2025-05-18T03:55:00+05:00'); // Updated to current time

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Welcome to Diamond Salon</h1>
          <p>Indulge in luxury beauty services tailored to your unique style.</p>
          <Link to="/booking" className="btn">Book Now</Link>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1661380558859-40df8dd91dfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2Fsb258ZW58MHx8MHx8fDA%3D"
            alt="Salon Interior"
          />
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '64px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '32px', textAlign: 'center', marginBottom: '32px' }}
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '32px', marginBottom: '24px' }}
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 24px' }}
          >
            Explore our premium beauty treatments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/services" className="btn">View Services</Link>
          </motion.div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="deals">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '32px', marginBottom: '24px' }}
          >
            Current Deals
          </motion.h2>
          {loading ? (
            <p>Loading deals...</p>
          ) : deals.length === 0 ? (
            <p>No active deals available.</p>
          ) : (
            <div className="grid">
              {deals.map((deal) => {
                const expiryDate = new Date(deal.expiryDate);
                const isExpired = expiryDate < currentDate;
                return (
                  <div key={deal._id || deal.id} className="deal-card">
                    <h3 className={isExpired ? 'expired' : ''}>{deal.title}</h3>
                    <p><strong>Discount:</strong> {deal.discount}</p>
                    <p><strong>Description:</strong> {deal.description}</p>
                    <p><strong>Expires:</strong> {expiryDate.toLocaleDateString()}</p>
                    {isExpired && <p>Expired</p>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;