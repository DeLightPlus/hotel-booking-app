// src/components/Footer.jsx
import React from "react";
import "./Footer.css";  // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Top Section */}
      <div className="footer-top">
        <div className="footer-container">
          {/* Logo and Contact */}
          <div className="footer-section">
            <div className="footer-logo">
              <a href="/" aria-label="Home">
                <img
                  src=""
                  alt="🛏️RestLeBnB"
                />
              </a>
            </div>

            <p>📍 15 Biccard Street, Polokwane, Limpopo, South Africa</p>
            <a href="tel:123456" className="footer-contact">
              <span>📞 Call Us: 123456</span>
            </a>
            <a href="mailto:contact@example.com" className="footer-contact">
              <span>📧 Email Us: contact@restlebnb.com</span>
            </a>
          </div>

          {/* About Section */}
          <div className="footer-section">
            <h5>About</h5>
            <ul>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Stories</a></li>
              <li><a href="#">Awards</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h5>Support</h5>
            <ul>
              <li><a href="#">Online Booking</a></li>
              <li><a href="#">Refund</a></li>
              <li><a href="#">Change Schedule</a></li>
              <li><a href="#">Online Checkin</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2024 Designed by DeLightPlus</p>

          {/* Social Media Icons */}
          <div className="footer-social">
            <a href="#" aria-label="Facebook" className="social-icon">📘</a>
            <a href="#" aria-label="Twitter" className="social-icon">🐦</a>
            <a href="#" aria-label="Instagram" className="social-icon">📸</a>
            <a href="#" aria-label="YouTube" className="social-icon">🎥</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
