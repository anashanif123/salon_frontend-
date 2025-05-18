import { motion } from 'framer-motion';
import { Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: '64px 16px',
        minHeight: '100vh',
        // background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '32px',
            textAlign: 'center',
            marginBottom: '24px',
            color: '#2d3436',
          }}
        >
          ✉️ Contact Us
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Name Field */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#636e72',
              }}
            >
              <User size={16} style={{ marginRight: '6px' }} />
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              required
              style={{
                padding: '12px',
                border: '1px solid #dcdde1',
                borderRadius: '8px',
                fontSize: '15px',
              }}
            />
          </div>

          {/* Email Field */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#636e72',
              }}
            >
              <Mail size={16} style={{ marginRight: '6px' }} />
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              style={{
                padding: '12px',
                border: '1px solid #dcdde1',
                borderRadius: '8px',
                fontSize: '15px',
              }}
            />
          </div>

          {/* Message Field */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#636e72',
              }}
            >
              <MessageSquare size={16} style={{ marginRight: '6px' }} />
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Type your message here..."
              required
              style={{
                padding: '12px',
                border: '1px solid #dcdde1',
                borderRadius: '8px',
                fontSize: '15px',
                resize: 'vertical',
              }}
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              padding: '14px',
              backgroundColor: '#6c5ce7',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: '0.3s ease',
            }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
