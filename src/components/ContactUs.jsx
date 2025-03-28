import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/ContactUs.css';

const ContactUs = () => {
  return (
    <section className="conntact-sectio" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">CONTACT</h2>
        <div className="contact-info">
          <div className="contact-phone">
            <h3>Phone</h3>
            <p><FontAwesomeIcon icon={faPhone} /> +123 456 7890</p>
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