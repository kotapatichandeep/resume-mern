const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Created uploads directory');
}

app.use('/uploads', express.static('uploads'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    });

// Routes
app.use('/api/resume', require('./routes/resumeRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.message);
    if (err.stack) console.error(err.stack);

    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
