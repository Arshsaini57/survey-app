import React, { useState } from 'react';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page">
      <h1 className="contact-page-title">Contact Us</h1>
      <form 
        onSubmit={handleSubmit} 
        className="contact-page-form"
      >
        <div className="contact-page-form-group">
          <label className="contact-page-form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="contact-page-form-input"
            required
          />
        </div>
        <div className="contact-page-form-group">
          <label className="contact-page-form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="contact-page-form-input"
            required
          />
        </div>
        <div className="contact-page-form-group">
          <label className="contact-page-form-label">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="contact-page-form-textarea"
            rows="4"
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="contact-page-form-submit"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;