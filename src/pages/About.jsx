import { motion } from 'framer-motion';

const About = () => (
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
      About Diamond Salon
    </motion.h1>
    <div className="grid" style={{ alignItems: 'center' }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Our Story</h2>
        <p style={{ color: '#666', fontSize: '16px', maxWidth: '500px' }}>
          Founded in 2020, Diamond Salon offers exceptional beauty services with a focus on luxury and care. Our expert team is dedicated to enhancing your natural beauty.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://media.istockphoto.com/id/1365608588/photo/shot-of-two-young-hairstylists-standing-together-and-using-a-digital-tablet-in-their-salon.jpg?s=612x612&w=0&k=20&c=F2qOP907c1AZfOjH8H1CQxG86myOu1yRv915vXEKjec="
          alt="Our Team"
          style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </motion.div>
    </div>
  </motion.div>
);

export default About;
