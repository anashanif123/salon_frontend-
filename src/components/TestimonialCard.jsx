import React from 'react';
import { motion } from 'framer-motion';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const imageUrl = testimonial?.image || 'https://placehold.co/70x70/E0E0E0/757575?text=User';
  const testimonialText = testimonial?.text || "This is a fantastic service! Highly recommended to everyone.";
  const testimonialName = testimonial?.name || "Anonymous";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="testimonial-card"
    >
      <img
        src={imageUrl}
        alt={`Photo of ${testimonialName}`}
        className="testimonial-card-image"
        loading="lazy"
      />
      <blockquote className="testimonial-card-text">
        {testimonialText}
      </blockquote>
      <p className="testimonial-card-name">{testimonialName}</p>
    </motion.div>
  );
};

export default TestimonialCard;
