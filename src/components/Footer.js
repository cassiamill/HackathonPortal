import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the new CSS file

export default function Footer() {
  return (
    <footer className="portal-footer">
      {/* STUDENT TODO: Replace the current year with a dynamic one */}
      <p>&copy; {new Date().getFullYear()} Niagara College - Toronto Hackathon Portal</p>
      <div className="footer-links">
        {/* Simple links as an example */}
        <Link to="/about">About Hackathon</Link>
        <span>|</span>
        <Link to="/contact">Contact Support</Link>
      </div>
    </footer>
  );
}