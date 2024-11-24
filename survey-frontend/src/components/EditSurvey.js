// src/components/EditSurvey.js

import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditSurvey = () => {
    const { id } = useParams(); // Get survey ID from the URL
    const navigate = useNavigate();
    const [survey, setSurvey] = useState(null);
    const [formData, setFormData] = useState({ title: '', questions: [] });
    const [newQuestion, setNewQuestion] = useState('');
    const [newOptions, setNewOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const res = await API.get(`/surveys/${id}`);
                setSurvey(res.data);
                setFormData({ title: res.data.title, questions: res.data.questions });
            } catch (err) {
                alert('Failed to load survey data');
            }
        };
        fetchSurvey();
    }, [id]);

    const handleAddOption = () => {
        if (newOption.trim()) {
            setNewOptions([...newOptions, newOption.trim()]);
            setNewOption('');
        }
    };

    const handleAddQuestion = () => {
        if (!newQuestion.trim()) {
            setMessage('Please add a valid question');
            return;
        }
        if (newOptions.length === 0) {
            setMessage('Please add at least one option');
            return;
        }
        setFormData({
            ...formData,
            questions: [...formData.questions, { questionText: newQuestion, options: newOptions }],
        });
        setNewQuestion('');
        setNewOptions([]);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || formData.questions.length === 0) {
            setMessage('Please provide a title and add at least one question.');
            return;
        }

        try {
            await API.put(`/surveys/${id}`, formData); // PUT request to update the survey
            setMessage('Survey updated successfully!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            setMessage('Error updating survey. Please try again.');
        }
    };

    if (!survey) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h2>Edit Survey</h2>
            {message && <p className="text-danger">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Survey Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Add New Question</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Enter question"
                    />
                    <label className="mt-2">Options</label>
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            placeholder="Enter option"
                        />
                        <button type="button" className="btn btn-secondary ml-2" onClick={handleAddOption}>
                            Add Option
                        </button>
                    </div>
                    <ul className="mt-2">
                        {newOptions.map((option, idx) => (
                            <li key={idx}>{option}</li>
                        ))}
                    </ul>
                </div>
                <button type="button" className="btn btn-primary mt-3" onClick={handleAddQuestion}>
                    Add Question
                </button>

                <h4 className="mt-4">Existing Questions</h4>
                <ul>
                    {formData.questions.map((q, index) => (
                        <li key={index}>
                            <b>{q.questionText}</b>
                            <ul>
                                {q.options.map((opt, idx) => (
                                    <li key={idx}>{opt}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <button type="submit" className="btn btn-success mt-4">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditSurvey;
