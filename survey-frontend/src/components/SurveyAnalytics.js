// src/components/SurveyAnalytics.js

import React, { useState, useEffect } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';

const SurveyAnalytics = () => {
    const { id } = useParams(); // Survey ID from URL
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await API.get(`/surveys/${id}/analytics`);
                setAnalytics(res.data);
            } catch (err) {
                alert('Failed to load analytics');
            }
        };
        fetchAnalytics();
    }, [id]);

    if (!analytics) return <p>Loading analytics...</p>;

    // Bar chart data
    const barData = {
        labels: analytics.questions.map((q) => q.questionText),
        datasets: [
            {
                label: 'Number of Responses',
                data: analytics.questions.map((q) => q.responses.length),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
            },
        ],
    };

    // Pie chart data
    const pieData = {
        labels: analytics.questions.map((q) => q.questionText),
        datasets: [
            {
                data: analytics.questions.map((q) => q.responses.length),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="container mt-5">
            <h2>Survey Analytics</h2>
            <div className="row">
                <div className="col-md-6">
                    <h4>Response Count (Bar Chart)</h4>
                    <Bar data={barData} />
                </div>
                <div className="col-md-6">
                    <h4>Response Distribution (Pie Chart)</h4>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default SurveyAnalytics;
