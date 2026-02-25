const express = require('express');
const router = express.Router();
const clerkAuth = require('../middleware/clerkAuth');
const upload = require('../utils/upload');
const {
    uploadResume,
    getResumes,
    getResumeById,
    updateResumeStatus,
    deleteResume
} = require('../controllers/resumeController');

// @route   POST api/resume/upload
// @desc    Upload and parse resume
// @access  Private
router.post('/upload', clerkAuth, upload.single('resume'), uploadResume);

// @route   GET api/resume
// @desc    Get all resumes for user
// @access  Private
router.get('/', clerkAuth, getResumes);

// @route   GET api/resume/:id
// @desc    Get resume by ID
// @access  Private
router.get('/:id', clerkAuth, getResumeById);

// @route   PUT api/resume/:id/status
// @desc    Update resume status
// @access  Private
router.put('/:id/status', clerkAuth, updateResumeStatus);

// @route   DELETE api/resume/:id
// @desc    Delete resume
// @access  Private
router.delete('/:id', clerkAuth, deleteResume);

module.exports = router;

