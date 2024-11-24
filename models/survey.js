// const mongoose = require('mongoose');

// const surveySchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     questions: [
//         {
//             questionText: { type: String, required: true },
//             options: [String], // e.g., ["Option 1", "Option 2"]
//         }
//     ],
//     creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     responses: [
//         {
//             answers: [String], // User's answers to questions
//         }
//     ]
// });

// module.exports = mongoose.model('Survey', surveySchema);



const express = require('express');
const Survey = require('../models/survey');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { title, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
        return res.status(400).json({ error: 'Title and questions are required' });
    }

    try {
        const newSurvey = new Survey({
            title,
            questions,
            creator: req.user.userId, // Use userId from authMiddleware
        });

        await newSurvey.save();
        res.status(201).json({ message: 'Survey created successfully', survey: newSurvey });
    } catch (err) {
        console.error('Error creating survey:', err);
        res.status(500).json({ error: 'Failed to create survey' });
    }
});

module.exports = router;
