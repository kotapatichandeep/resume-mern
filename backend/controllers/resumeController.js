const Resume = require('../models/Resume');
const { analyzeResume } = require('../services/aiService');
const fs = require('fs');

// Upload and Parse Resume
exports.uploadResume = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    try {
        // AI Analysis
        const analysisResults = await analyzeResume(req.file.path);

        // Create Resume Entry
        const newResume = new Resume({
            userId: req.user.id,
            title: req.file.originalname, // Default to filename
            description: analysisResults.summary,
            category: 'General', // Default, can be updated later
            fileUrl: `uploads/${req.file.filename}`,
            status: 'New',
            score: analysisResults.score,
            skills: analysisResults.skills
        });

        const resume = await newResume.save();
        res.json(resume);

    } catch (err) {
        console.error("Upload Error Stack:", err);

        // Clean up file if error
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkErr) {
                console.error("Failed to unlink file:", unlinkErr);
            }
        }
        res.status(500).send('Server Error');
    }
};

// Get All Resumes (Admin/User specific logic can be added)
exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Single Resume
exports.getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ msg: 'Resume not found' });

        // Ensure user owns resume (or is admin)
        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(resume);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Resume not found' });
        res.status(500).send('Server Error');
    }
};

// Update Resume Status
exports.updateResumeStatus = async (req, res) => {
    const { status } = req.body;
    try {
        let resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ msg: 'Resume not found' });

        // Update status
        resume.status = status;
        await resume.save();

        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Resume
exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }

        // Ensure user owns resume
        if (resume.userId !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Delete file from filesystem
        const filePath = resume.fileUrl; // This is 'uploads/filename'
        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) console.error("Failed to delete file:", err);
            });
        }

        await Resume.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Resume removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
