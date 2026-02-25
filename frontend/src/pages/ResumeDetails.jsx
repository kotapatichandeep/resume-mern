import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '@clerk/clerk-react';

const ResumeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const token = await getToken();
                const res = await api.get(`/resume/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResume(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load resume details.');
                setLoading(false);
            }
        };
        fetchResume();
    }, [id]);


    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this resume analysis? This action cannot be undone.')) {
            try {
                const token = await getToken();
                await api.delete(`/resume/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Resume deleted successfully.');
                navigate('/dashboard');
            } catch (err) {
                console.error(err);
                alert('Failed to delete resume. Please try again.');
            }
        }
    };


    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading analysis...</div>;
    if (error) return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'var(--danger)' }}>{error}</div>;

    return (
        <div className="details-page animate-fade-in">
            <div className="container">
                <button onClick={() => navigate('/dashboard')} className="btn btn-secondary btn-sm" style={{ marginBottom: '2rem' }}>
                    ← Back to Dashboard
                </button>

                <div className="details-layout">
                    <div className="glass-card main-analysis">
                        <div className="header-flex">
                            <div>
                                <h2>{resume.title}</h2>
                                <p className="subtitle">Parsed on {new Date(resume.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="score-circle">
                                <span className="score-num">{resume.score}%</span>
                                <span className="score-label">Match Score</span>
                            </div>
                        </div>

                        <div className="analysis-section">
                            <h3>🤖 AI Summary</h3>
                            <p className="summary-text">{resume.description}</p>
                        </div>

                        <div className="analysis-section">
                            <h3>🛠️ Key Skills Detected</h3>
                            <div className="skills-cloud">
                                {resume.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-analysis">
                        <div className="glass-card meta-card">
                            <h4>Current Status</h4>
                            <div className={`status-badge ${resume.status.toLowerCase()}`}>{resume.status}</div>

                            <hr style={{ margin: '1.5rem 0', opacity: 0.1 }} />

                            <h4>Actions</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <a href={`http://localhost:5001/${resume.fileUrl}`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                                    View Original PDF
                                </a>
                                <button className="btn btn-secondary" onClick={handleDelete} style={{ width: '100%', color: 'var(--danger)' }}>
                                    Delete Record
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .details-page { padding: 40px 0; min-height: 80vh; }
                .details-layout {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 30px;
                }
                .header-flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 2rem;
                }
                .score-circle {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: var(--surface);
                    border: 1px solid var(--border-subtle);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
                }
                .score-num { font-size: 2rem; font-weight: 800; line-height: 1; color: var(--text-primary); }
                .score-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; margin-top: 4px; color: var(--text-secondary); }
                .analysis-section { margin-bottom: 2.5rem; }
                .summary-text { font-size: 1.1rem; color: #f1f5f9; line-height: 1.7; }
                .skills-cloud { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 1rem; }
                .skill-tag {
                    padding: 8px 16px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                .status-badge {
                    display: inline-block;
                    padding: 6px 14px;
                    border-radius: 6px;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                }
                .status-badge.new { background: #6366f1; color: white; }
                .meta-card h4 { margin-bottom: 1rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; }
                @media (max-width: 968px) {
                    .details-layout { grid-template-columns: 1fr; }
                }
            `}} />
        </div>
    );
};

export default ResumeDetails;
