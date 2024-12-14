// // src/pages/Signup.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Implement signup logic
//     console.log('Signup submitted:', formData);
//   };

//   return (
//     <div className="signup-page-container">
//       <div className="signup-card">
//         <h2 className="signup-title">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="signup-form-group">
//             <label className="signup-form-label">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="signup-form-input"
//               required
//             />
//           </div>
//           <div className="signup-form-group">
//             <label className="signup-form-label">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="signup-form-input"
//               required
//             />
//           </div>
//           <div className="signup-form-group">
//             <label className="signup-form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="signup-form-input"
//               required
//             />
//           </div>
//           <div className="signup-form-group">
//             <label className="signup-form-label">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="signup-form-input"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="signup-form-submit"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="signup-form-footer">
//           Already have an account? <Link to="/login" className="signup-form-link">Sign In</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// src/components/Register.js
import './Signup.css';
import React, { useState } from 'react';
import API from '../api';  // Axios API instance

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        // Validate if any field is missing
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill all fields');
            setLoading(false);
            return;
        }

        try {
            const res = await API.post('/auth/register', formData);  // POST to the backend register route
            setMessage(res.data.message); // Show success message
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to login page after successful registration
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-body">
//                             <h3 className="card-title text-center">Sign Up</h3>
//                             {message && <p className="text-center text-info">{message}</p>}
//                             {error && <p className="text-center text-danger">{error}</p>}
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group">
//                                     <label>Name</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Enter your name"
//                                         value={formData.name}
//                                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group mt-3">
//                                     <label>Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         placeholder="Enter your email"
//                                         value={formData.email}
//                                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group mt-3">
//                                     <label>Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         placeholder="Enter your password"
//                                         value={formData.password}
//                                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                                         required
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
//                                     {loading ? 'Signing Up...' : 'Sign Up'}
//                                 </button>
//                             </form>
//                             <p className="mt-3 text-center">
//                                 Already have an account? <a href="/login">Sign In</a>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

return (
  <div className="register-page-container">
    <div className="register-card">
      <h3 className="register-title">Sign Up</h3>
      {message && <p className="text-center text-info">{message}</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label className="register-form-label">Name</label>
          <input
            type="text"
            className="register-form-input"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-label">Email</label>
          <input
            type="email"
            className="register-form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-label">Password</label>
          <input
            type="password"
            className="register-form-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="register-form-submit"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p className="register-form-footer">
        Already have an account? <a href="/login" className="register-form-link">Sign In</a>
      </p>
    </div>
  </div>
);
};

export default Register;
