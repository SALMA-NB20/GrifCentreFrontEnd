import React from 'react';
import '../styles/Footer.css';
// Remove the import for the logo that doesn't exist
// import grifLogo from '../assets/grif-logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          {/* Replace the image with text or you can add the image later */}
          <div className="logo-text">GRIF CENTRE</div>
        </div>
        <div className="footer-copyright">
          © 2023 GRIF CENTRE ACADEMIC.
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" className="social-icon">
            <i className="facebook-icon"></i>
          </a>
          <a href="https://instagram.com" className="social-icon">
            <i className="instagram-icon"></i>
          </a>
          <a href="https://twitter.com" className="social-icon">
            <i className="twitter-icon"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;