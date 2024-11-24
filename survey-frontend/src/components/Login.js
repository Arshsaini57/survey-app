// src/components/Login.js

import React, { useState } from 'react';
import API from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        // Basic form validation
        if (!formData.email || !formData.password) {
            setError('Please enter both email and password.');
            setLoading(false);
            return;
        }

        try {
            const res = await API.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            setMessage('Login successful! Redirecting to dashboard...');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
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
                            <h3 className="card-title text-center">Sign In</h3>
                            {message && <p className="text-center text-info">{message}</p>}
                            {error && <p className="text-center text-danger">{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </form>
                            <p className="mt-3 text-center">
                                Don’t have an account? <a href="/register">Sign Up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
