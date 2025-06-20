import express from 'express';
import bcrypt from 'bcrypt'; 
import { connectToDatabase } from '../lib/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Email validation function
const isValidTrigentEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@trigent\.com$/.test(email);
};

// Register user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; 

    // Validate email format
    if (!isValidTrigentEmail(email)) {
        return res.status(400).json({ message: "Only @trigent.com emails are allowed" });
    }

    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [name, email, hashPassword]
        );

        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err); 
        return res.status(500).json({ error: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate email format
    if (!isValidTrigentEmail(email)) {
        return res.status(400).json({ message: "Only @trigent.com emails are allowed" });
    }

    try {
        const db = await connectToDatabase();
        const [rows] = await db.execute('SELECT id, password_hash FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const { id, password_hash: hashedPassword } = rows[0];
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '3h' });

        return res.status(200).json({ token });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Token verification middleware
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

// Get user details (protected route)
router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }

        return res.status(200).json({ user: rows[0] });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
});

export default router;
