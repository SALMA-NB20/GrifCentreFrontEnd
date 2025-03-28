import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Ensure this path is correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          GrifCentre
        </Link>
        <div className="navbar-links">
          <a href="#about-section" className="nav-link">About Us</a> {/* Update href to match section ID */}
          <a href="#contact-section" className="nav-link">Contact Us</a> {/* Update href to match section ID */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
