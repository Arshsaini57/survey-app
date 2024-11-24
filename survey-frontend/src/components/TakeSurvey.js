// src/components/TakeSurvey.js

import React, { useState, useEffect } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';

const TakeSurvey = () => {
    const { id } = useParams(); // Get survey ID from URL
    const [survey, setSurvey] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const res = await API.get(`/surveys/${id}`);
                setSurvey(res.data);
                const initialAnswers = res.data.questions.map((q) => ({
                    questionText: q.questionText,
                    selectedOption: ''
                }));
                setAnswers(initialAnswers);
            } catch (err) {
                alert('Failed to load survey');
            }
        };
        fetchSurvey();
    }, [id]);

    const handleAnswerChange = (questionText, selectedOption) => {
        setAnswers((prevAnswers) => 
            prevAnswers.map((answer) =>
                answer.questionText === questionText
                    ? { ...answer, selectedOption }
                    : answer
            )
        );
    };

    const handleSubmit = async () => {
        try {
            await API.post(`/surveys/${id}/responses`, { answers });
            alert('Your responses have been submitted!');
        } catch (err) {
            alert('Failed to submit your responses');
        }
    };

    if (!survey) return <p>Loading survey...</p>;

    return (
        <div className="container mt-5">
            <h2>{survey.title}</h2>
            <form>
                {survey.questions.map((question, index) => (
                    <div key={index} className="form-group">
                        <label>{question.questionText}</label>
                        <div>
                            {question.options.map((option, idx) => (
                                <div key={idx} className="form-check">
                                    <input
                                        type="radio"
                                        id={`${question.questionText}-${option}`}
                                        name={question.questionText}
                                        value={option}
                                        className="form-check-input"
                                        onChange={() => handleAnswerChange(question.questionText, option)}
                                        checked={answers.find((a) => a.questionText === question.questionText && a.selectedOption === option)}
                                    />
                                    <label htmlFor={`${question.questionText}-${option}`} className="form-check-label">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Submit Responses
                </button>
            </form>
        </div>
    );
};

export default TakeSurvey;
