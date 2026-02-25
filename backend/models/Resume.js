const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String, // e.g., Candidate Name or Job Title
        required: true
    },
    description: {
        type: String // Parsed content or summary
    },
    category: {
        type: String, // e.g., "Engineering", "Marketing"
        default: 'General'
    },
    status: {
        type: String, // e.g., "New", "Reviewed", "Shortlisted", "Rejected"
        default: 'New'
    },
    fileUrl: {
        type: String // Path to uploaded PDF
    },
    score: {
        type: Number // AI score
    },
    skills: [String], // Extracted skills
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

resumeSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Resume', resumeSchema);
