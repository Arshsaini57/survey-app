// src/components/SurveyResponses.js

import React, { useState, useEffect } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';

const SurveyResponses = () => {
    const { id } = useParams(); // Get survey ID from the URL
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await API.get(`/surveys/${id}/responses`);
                setResponses(res.data);
            } catch (err) {
                alert('Failed to load responses');
            }
        };
        fetchResponses();
    }, [id]);

    if (!responses.length) return <p>No responses yet.</p>;

    return (
        <div className="container mt-5">
            <h2>Survey Responses</h2>
            <ul>
                {responses.map((response, index) => (
                    <li key={index}>
                        <b>Response {index + 1}</b>
                        <ul>
                            {response.answers.map((answer, idx) => (
                                <li key={idx}>
                                    <b>{answer.questionText}: </b>
                                    {answer.selectedOption}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SurveyResponses;
