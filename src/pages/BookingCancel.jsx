import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BookingCancel = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="container"
    style={{ padding: '64px 0', textAlign: 'center' }}
  >
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ fontSize: '40px', marginBottom: '24px' }}
    >
      Booking Cancelled
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ fontSize: '18px', marginBottom: '24px' }}
    >
      Your booking has been cancelled. Please try again.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Link to="/booking" className="btn">Book Again</Link>
    </motion.div>
  </motion.div>
);

export default BookingCancel;