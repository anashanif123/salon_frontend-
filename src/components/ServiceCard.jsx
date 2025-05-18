import React from 'react';
import { motion } from 'framer-motion';
import './ServiceCard.css'; // Import the CSS file

const ServiceCard = ({ service }) => {
  // Fallback image in case service.image is not provided
  const imageUrl = service.image || 'https://images.unsplash.com/photo-1610873168558-c1e5b11607a0?w=500&q=80';
  // Fallback for other properties to prevent rendering errors
  const serviceName = service.name || 'Service Name';
  const serviceDescription = service.description || 'Detailed description of the service offering.';
  const servicePrice = service.price !== undefined ? service.price : 'N/A';
  const serviceDuration = service.duration || 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }} // Optional: add a slight delay
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% in view, only once
      className="card service-card" // Added "service-card" for specific targeting if needed, "card" for general styles
    >
      <div className="service-card-image-container">
        <img
          src={imageUrl}
          alt={serviceName}
          className="service-card-image"
        />
      </div>
      <div className="service-card-content">
        <h3 className="service-card-title">{serviceName}</h3>
        <p className="service-card-description">{serviceDescription}</p>
        <p className="service-card-meta">
          <span className="service-card-price">${servicePrice}</span>
          <span className="service-card-separator"> | </span>
          <span className="service-card-duration">{serviceDuration} mins</span>
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;