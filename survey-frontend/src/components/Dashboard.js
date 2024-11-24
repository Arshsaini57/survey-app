// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const res = await API.get('/surveys');
                setSurveys(res.data);
            } catch (err) {
                alert('Error fetching surveys');
            }
        };
        fetchSurveys();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <div>
                {surveys.map((survey) => (
                    <div key={survey._id} className="survey-item">
                        <h3>{survey.title}</h3>
                        <Link to={`/survey/${survey._id}`}>View Survey Details</Link> | 
                        <Link to={`/survey/${survey._id}/responses`}>View Responses</Link> |
                        <Link to={`/survey/${survey._id}/analytics`}>View Analytics</Link>
                    </div>
                ))}
            </div>
            <Link to="/create-survey" className="btn btn-primary mt-4">Create New Survey</Link>
        </div>
    );
};

export default Dashboard;
