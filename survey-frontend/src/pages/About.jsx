import React from 'react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1 className="about-page-title">About Cognify</h1>
        <p className="about-page-tagline">
          Simplifying surveys with precision and innovation.
        </p>
      </header>
      <div className="about-page-content">
        <section className="about-mission">
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-page-description">
            At Cognify, we aim to make survey creation and distribution seamless, 
            effective, and insightful for everyone.
          </p>
        </section>
        <section className="about-features">
          <h2 className="about-section-title">Key Features</h2>
          <ul className="about-page-features">
            <li>Effortless survey creation with intuitive tools</li>
            <li>Support for various question types</li>
            <li>Real-time analytics to track and optimize responses</li>
            <li>Top-notch security for reliable data collection</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
