// backend/routes/surveyRoutes.js

const express = require('express');
const Survey = require('../models/survey');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST route to create a new survey
router.post('/', authMiddleware, async (req, res) => {
    const { title, questions } = req.body;
    
    if (!title || !questions) {
        return res.status(400).json({ error: 'Title and questions are required' });
    }

    try {
        const newSurvey = new Survey({ title, questions });
        await newSurvey.save();
        res.status(201).json(newSurvey); // Return the created survey
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create survey' });
    }
});

// Add other routes as necessary (e.g., GET, DELETE, etc.)
module.exports = router;
