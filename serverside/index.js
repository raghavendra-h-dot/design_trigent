import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

import authRouter from './routes/authRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Ensure uploads directory exists
const uploadDir = path.join('uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use('/auth', authRouter);
app.use('/upload', uploadRouter);
app.use('/uploads', express.static('uploads')); // Serve uploaded images and PDFs

app.get('/', (req, res) => {
    res.send("Server is running!");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is Running on port ${process.env.PORT || 5000}`);
});
