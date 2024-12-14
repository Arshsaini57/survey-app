import React from 'react';
import './Home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="home-header">
        <div className="logo-container">
          <h1 className="home-page-title">Welcome To Cognify</h1>
        </div>
        <p className="home-page-tagline">
          Empowering you to create, share, and analyze surveys effortlessly.
        </p>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Unleash the Power of Surveys</h2>
          <p className="hero-description">
            Discover a seamless way to gather insights and make data-driven decisions.
          </p>
          <button className="home-page-start-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-page-features">
        <div className="home-page-feature">
          <div className="feature-icon-container">
            
          </div>
          <h3 className="home-page-feature-title">Create Surveys</h3>
          <p className="home-page-feature-description">
            Design intuitive surveys in minutes with custom templates.
          </p>
        </div>
        <div className="home-page-feature">
          <div className="feature-icon-container">
            
          </div>
          <h3 className="home-page-feature-title">Share Instantly</h3>
          <p className="home-page-feature-description">
            Distribute your surveys via link, email, or social media platforms.
          </p>
        </div>
        <div className="home-page-feature">
          <div className="feature-icon-container">
           
          </div>
          <h3 className="home-page-feature-title">Analyze Results</h3>
          <p className="home-page-feature-description">
            Visualize data with interactive charts and gain actionable insights.
          </p>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="additional-features">
        <h2 className="additional-feature-title">Why Choose Cognify?</h2>
        <div className="additional-feature-cards">
          <div className="feature-card">
            <h3>Explore Popular Surveys</h3>
            <p>
              Engage with the top surveys created by our thriving community.
            </p>
          </div>
          <div className="feature-card">
            <h3>Survey Templates</h3>
            <p>
              Jumpstart your surveys with professionally designed templates.
            </p>
          </div>
          <div className="feature-card">
            <h3>Team Collaboration</h3>
            <p>
              Collaborate seamlessly with your team for enhanced productivity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
