// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Surveys from './pages/Surveys';
import Contact from './pages/Contact';
import Users from './pages/Users';
import Login from './pages/Login';
import Signin from './pages/Signin'; // Import Signin page
import Signup from './pages/Signup'; // Import Signup page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/surveys" element={<Surveys />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} /> {/* New route for Signin */}
            <Route path="/signup" element={<Signup />} /> {/* New route for Signup */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
