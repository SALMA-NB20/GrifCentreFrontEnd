import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Information</h2>
        <div className="contact-content">
          <p>
            <FontAwesomeIcon icon={faPhone} /> +123 456 7890
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> info@grifcentre.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;