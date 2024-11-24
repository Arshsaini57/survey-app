// src/components/CreateSurvey.js

import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
    const [formData, setFormData] = useState({ title: '', questions: [] });
    const [newQuestion, setNewQuestion] = useState('');
    const [newOptions, setNewOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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
            console.log('Form Data being sent:', formData); // Add this log
            await API.post('/surveys', formData); // Send data to the backend
            setMessage('Survey created successfully!');
            setTimeout(() => {
                navigate('/dashboard'); // Redirect after success
            }, 2000);
        } catch (err) {
            console.error('Error:', err.response?.data || err.message); // Log any error from backend
            setMessage('Error creating survey. Please try again.');
        }
    };
    

    
    return (
        <div className="container mt-5">
            <h2>Create New Survey</h2>
            {message && <p className="text-danger">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Survey Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter survey title"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label>New Question</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter question"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <label className="mt-2">Options</label>
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter option"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
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
                    Submit Survey
                </button>
            </form>
        </div>
    );
};

export default CreateSurvey;
