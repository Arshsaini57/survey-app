// src/components/SurveyDetails.js

import React, { useState, useEffect } from 'react';
import API from '../api';
import { useParams, Link } from 'react-router-dom';

const SurveyDetails = () => {
    const { id } = useParams(); // Get survey ID from the URL
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurveyDetails = async () => {
            try {
                const res = await API.get(`/surveys/${id}`);
                setSurvey(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch survey details', err);
                setLoading(false);
            }
        };
        fetchSurveyDetails();
    }, [id]);

    if (loading) return <p>Loading survey details...</p>;
    if (!survey) return <p>Survey not found</p>;

    return (
        <div className="container mt-5">
            <h2>{survey.title}</h2>

            <h4>Questions</h4>
            {survey.questions.length > 0 ? (
                <ul>
                    {survey.questions.map((question, index) => (
                        <li key={index}>
                            <h5>{question.questionText}</h5>
                            <ul>
                                {question.options.map((option, idx) => (
                                    <li key={idx}>{option}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No questions found for this survey.</p>
            )}

            {/* Link to take the survey */}
            <Link to={`/survey/${survey._id}`} className="btn btn-primary mt-4">
                Take Survey
            </Link>
        </div>
    );
};

export default SurveyDetails;
