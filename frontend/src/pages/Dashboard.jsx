import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ResumeUpload from '../components/ResumeUpload';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';

const Dashboard = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [resumes, setResumes] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        averageScore: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);


    const fetchResumes = async () => {
        try {
            const token = await getToken();
            const res = await api.get('/resume', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResumes(res.data);
            calculateStats(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };


    const calculateStats = (data) => {
        if (data.length === 0) {
            setStats({ total: 0, averageScore: 0 });
            return;
        }
        const total = data.length;
        const avg = Math.round(data.reduce((acc, curr) => acc + curr.score, 0) / total);

        setStats({ total, averageScore: avg });
    };

    const onUploadSuccess = (newResume) => {
        const updatedResumes = [newResume, ...resumes];
        setResumes(updatedResumes);
        calculateStats(updatedResumes);
    };

    return (
        <div className="dashboard-page animate-fade-in">
            <div className="container">
                <header className="dashboard-header">
                    <div>
                        <h1>{user?.firstName || 'User'} <span style={{ color: 'var(--primary)' }}>Dashboard</span></h1>
                        <p className="subtitle">Manage and analyze your professional resumes</p>
                    </div>

                </header>

                <div className="stats-grid">
                    <div className="glass-card stat-card">
                        <span className="stat-label">Total Resumes</span>
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-trend">+ {stats.total > 0 ? 'Recently added' : 'Start uploading'}</div>
                    </div>
                    <div className="glass-card stat-card">
                        <span className="stat-label">Average Score</span>
                        <div className="stat-value">{stats.averageScore}%</div>
                        <div className="stat-progress">
                            <div className="progress-bar" style={{ width: `${stats.averageScore}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    <div className="upload-section">
                        <ResumeUpload onUploadSuccess={onUploadSuccess} />
                    </div>

                    <div className="resumes-section">
                        <div className="section-header">
                            <h3>Your Resumes ({resumes.length})</h3>
                        </div>

                        {loading ? (
                            <div className="loading-state">Loading your analytical data...</div>
                        ) : resumes.length === 0 ? (
                            <div className="glass-card empty-state">
                                <div className="icon">�</div>
                                <p>No resumes uploaded yet.</p>
                            </div>
                        ) : (
                            <div className="resume-list">
                                {resumes.map(resume => (
                                    <div key={resume._id} className="glass-card resume-card">
                                        <div className="resume-info">
                                            <h4>{resume.title}</h4>
                                            <p>{new Date(resume.createdAt).toLocaleDateString()} • {resume.skills?.slice(0, 3).join(', ')}</p>
                                        </div>
                                        <div className="resume-meta">
                                            <span className={`badge ${resume.score > 70 ? 'badge-success' : 'badge-warning'}`}>
                                                Score: {resume.score}%
                                            </span>
                                            <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/resume/${resume._id}`)}>View Details</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .dashboard-page { padding: 40px 0; min-height: calc(100vh - 70px); }
                .dashboard-header { margin-bottom: 40px; }
                .subtitle { color: var(--text-secondary); }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px; }
                .stat-card { padding: 1.5rem; position: relative; overflow: hidden; }
                .stat-label { color: var(--text-secondary); font-size: 0.875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
                .stat-value { font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0; }
                .stat-trend { font-size: 0.8rem; color: var(--success); font-weight: 600; }
                .stat-progress { height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; margin-top: 10px; }
                .progress-bar { height: 100%; background: var(--primary); border-radius: 3px; }
                .dashboard-content { display: grid; grid-template-columns: 350px 1fr; gap: 30px; align-items: flex-start; }
                .resumes-section { display: flex; flex-direction: column; gap: 20px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
                .resume-list { display: flex; flex-direction: column; gap: 15px; }
                .resume-card { padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; }
                .resume-card:hover { transform: translateX(5px); border-color: var(--accent); background: rgba(255,255,255,0.02); }
                .resume-info h4 { margin: 0; font-size: 1.1rem; }
                .resume-info p { margin: 0; font-size: 0.85rem; color: var(--text-secondary); }
                .resume-meta { display: flex; align-items: center; gap: 15px; }
                .empty-state { text-align: center; padding: 60px 40px; }
                .empty-state .icon { font-size: 3rem; margin-bottom: 1rem; }
                .btn-sm { padding: 0.5rem 1rem; font-size: 0.85rem; }
                @media (max-width: 1200px) {
                    .dashboard-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
                }
                @media (max-width: 968px) {
                    .dashboard-content { grid-template-columns: 1fr; }
                }
            `}} />
        </div>
    );
};

export default Dashboard;
