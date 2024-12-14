const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password entered:', password); // Log plain-text password
        console.log('Hashed Password:', hashedPassword); // Log hashed password

        const newUser = new User({
            name,
            email: email.trim().toLowerCase(), // Normalize email
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            console.log('No user found with email:', email.trim().toLowerCase()); // Log email search
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        console.log('Entered Password:', password); // Log plain-text password
        console.log('Stored Hashed Password:', user.password); // Log hashed password from DB

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isPasswordValid); // Log result of password comparison

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Log the JWT_SECRET value being used
        console.log('JWT_SECRET (signing):', process.env.JWT_SECRET);

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        console.log('Generated Token:', token); // Log the generated token

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

module.exports = router;
