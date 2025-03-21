import React from 'react';
import '../styles/ContactUs.css';

const ContactUs = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">CONTACT</h2>
        <div className="contact-info">
          <div className="contact-phone">
            <h3>Phone</h3>
            <p>+212 657 206177</p>
          </div>
          <div className="contact-locations">
            <h3>LOCATION</h3>
            <ul>
              <li>Asfi</li>
              <li>Marrakesh</li>
              <li>Tetouan</li>
            </ul>
          </div>
          <div className="contact-social">
            <a href="https://facebook.com" className="social-icon facebook">Facebook</a>
            <a href="https://instagram.com" className="social-icon instagram">Instagram</a>
            <a href="https://twitter.com" className="social-icon twitter">Twitter</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;