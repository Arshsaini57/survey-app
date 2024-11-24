// backend/routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
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


//     router.post('/register', async (req, res) => {
//         const { name, email, password } = req.body;
    
//         if (!name || !email || !password) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }
    
//         try {
//             // Check if the user already exists
//             const existingUser = await User.findOne({ email });
//             if (existingUser) {
//                 return res.status(400).json({ error: 'User already exists' });
//                    }
//                    const bcrypt = require('bcrypt');

// const normalizePasswords = async () => {
//     const users = await User.find();
//     for (const user of users) {
//         if (!user.password.startsWith('$2b$')) { // Check if it's already hashed
//             user.password = await bcrypt.hash(user.password, 10);
//             await user.save();
//         }
//     }
//     console.log('Passwords normalized');
// };
// normalizePasswords();


    
//             // Hash the password
//             const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
//             // Save the user to the database
//             const newUser = new User({ name, email, password: hashedPassword });
//             await newUser.save();
    
//             res.status(201).json({ message: 'User registered successfully!' });
//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Failed to register user' });
//         }
//     });
  

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            console.log('No user found with email:', email.trim().toLowerCase()); // Log email search
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        console.log('Entered Password:', password); // Log plain-text password
        console.log('Stored Hashed Password:', user.password); // Log hashed password from DB

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isPasswordValid); // Log result of password comparison

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});



module.exports = router;
