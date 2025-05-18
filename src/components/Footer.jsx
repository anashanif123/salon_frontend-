import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <p className="copyright">&copy; {new Date().getFullYear()} Diamond Salon. All rights reserved.</p>
      <p className="contact-info">
        123 Salon Street, Beauty City | contact@diamondsalon.com | (123) 456-7890
      </p>
      {/* Optional: Add social media links or other footer elements here */}
       <div className="footer-social-links">
        <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Twitter</a>
      </div> 
    </div>
  </footer>
);

export default Footer;