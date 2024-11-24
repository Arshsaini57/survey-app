// src/components/Register.js

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

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Sign Up</h3>
                            {message && <p className="text-center text-info">{message}</p>}
                            {error && <p className="text-center text-danger">{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
                                    {loading ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </form>
                            <p className="mt-3 text-center">
                                Already have an account? <a href="/login">Sign In</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
