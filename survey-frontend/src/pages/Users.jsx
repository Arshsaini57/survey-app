import React, { useState } from 'react';
import './Users.css';

const Users = () => {
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150" // Default profile picture
  );
  const [userDetails, setUserDetails] = useState({
    fullName: "Aswin Aji",
    phone: "not yet given ",
    address: "not yet given ",
    dob: "not yet given ",  
  });

  // Handlers for Profile Picture
  const handleUploadPicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePicture(imageURL);
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture("https://via.placeholder.com/150"); // Reset to default
  };

  // Handler for Editing Details
  const handleEditDetails = () => {
    const newDetails = {
      ...userDetails,
      fullName: prompt("Enter your full name:", userDetails.fullName) || userDetails.fullName,
      phone: prompt("Enter your phone number:", userDetails.phone) || userDetails.phone,
      address: prompt("Enter your address:", userDetails.address) || userDetails.address,
      dob: prompt("Enter your date of birth (YYYY-MM-DD):", userDetails.dob) || userDetails.dob,
    };
    setUserDetails(newDetails);
  };

  return (
    <div className="users-page">
      <header className="users-header">
        <h1 className="users-title">Profile</h1>
      </header>
      <div className="users-container">
        {/* Left Panel */}
        <aside className="users-side-panel">
          <div className="profile-section">
            <img
              src={profilePicture}
              alt="User Profile"
              className="profile-picture"
            />
            <label htmlFor="upload-profile" className="action-button">
              Add Profile Picture
            </label>
            <input
              type="file"
              id="upload-profile"
              accept="image/*"
              className="upload-input"
              onChange={handleUploadPicture}
            />
            <button className="action-button" onClick={handleRemovePicture}>
              Remove Profile Picture
            </button>
            <div className="profile-details">
              <p><strong>Username:</strong> Aswin</p>
              <p><strong>Email:</strong> aswin@gmail.com</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="users-main-content">
          <div className="info-section">
            <h2 className="section-title">About Me</h2>
            <div className="info-details">
              <p><strong>Full Name:</strong> {userDetails.fullName}</p>
              <p><strong>Phone Number:</strong> {userDetails.phone}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
              <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
              <button className="action-button" onClick={handleEditDetails}>
                Edit Details
              </button>
            </div>
          </div>
          <div className="info-section">
            <h2 className="section-title">Survey Stats</h2>
            <p><strong>Surveys Created:</strong> 0</p>
            <p><strong>Most Popular Survey:</strong> Customer Feedback Survey</p>
            <p><strong>Total Responses:</strong> No responses yet</p>
            <button className="action-button">View All Surveys</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;