import React, { useState } from 'react';
import api from '../utils/api';
import { useAuth } from '@clerk/clerk-react';

const ResumeUpload = ({ onUploadSuccess }) => {
    const { getToken } = useAuth();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            setFile(null);
            return;
        }
        if (selectedFile && selectedFile.size > 5000000) {
            setError('File size too large (max 5MB).');
            setFile(null);
            return;
        }
        setError('');
        setFile(selectedFile);
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const token = await getToken();
            const res = await api.post('/resume/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Resume Uploaded Successfully!');
            onUploadSuccess(res.data);
            setFile(null);
            setLoading(false);
            // Reset file input
            e.target.reset();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Error uploading file. Please try again.');
            setLoading(false);
        }
    };


    return (
        <div className="glass-card upload-card">
            <h3>Analyze New Resume</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Drop your PDF here for instant AI analysis and scoring.
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={onFormSubmit}>
                <div className="file-input-wrapper">
                    <input
                        type="file"
                        onChange={onFileChange}
                        id="resumeInput"
                        accept=".pdf"
                        hidden
                    />
                    <label htmlFor="resumeInput" className="file-drop-zone">
                        <span className="icon">📂</span>
                        <span className="text">{file ? file.name : 'Click to select or drag PDF'}</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading || !file}
                >
                    {loading ? 'Analyzing...' : 'Upload & Analyze Resume'}
                </button>
            </form>

            <style dangerouslySetInnerHTML={{
                __html: `
                .upload-card {
                    padding: 1.5rem;
                }
                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    padding: 0.75rem;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    font-size: 0.85rem;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }
                .file-input-wrapper {
                    margin-bottom: 1.5rem;
                }
                .file-drop-zone {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    border: 2px dashed rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: rgba(255, 255, 255, 0.02);
                }
                .file-drop-zone:hover {
                    border-color: var(--accent);
                    background: rgba(255, 255, 255, 0.05);
                }
                .file-drop-zone .icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }
                .file-drop-zone .text {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    text-align: center;
                }
                .btn-block {
                    width: 100%;
                }
            `}} />
        </div>
    );
};

export default ResumeUpload;
