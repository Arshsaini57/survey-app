const Survey = require('../models/survey');

exports.createSurvey = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const survey = await Survey.create({
            title,
            questions,
            creator: req.user.id,
        });
        res.status(201).json(survey);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find({ creator: req.user.id });
        res.json(surveys);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.submitResponse = async (req, res) => {
    try {
        const { surveyId, answers } = req.body;
        const survey = await Survey.findById(surveyId);
        if (!survey) return res.status(404).json({ error: 'Survey not found' });

        survey.responses.push({ answers });
        await survey.save();
        res.json({ message: 'Response submitted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
