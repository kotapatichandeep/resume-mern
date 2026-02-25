import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);


  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero animate-fade-in">
        <div className="container">
          <div className="hero-content">
            <span className="badge" style={{ background: 'var(--surface)', color: 'var(--text-secondary)', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>Professional Analysis</span>
            <h1>Unlock Your Career Potential with <span style={{ color: 'var(--text-primary)', textDecoration: 'underline', textDecorationColor: 'var(--accent)' }}>Resume</span> Intelligence</h1>
            <p className="hero-subtitle">
              Upload your resume and get instant feedback, score analysis, and skill matching
              using our advanced analytical engine. Clean. Simple. Natural.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">Get Started Free</Link>
              <Link to="/login" className="btn btn-secondary">Sign In</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glass-card main-viz">
              <div className="viz-header">
                <div className="dot" style={{ background: '#333' }}></div>
                <div className="dot" style={{ background: '#444' }}></div>
                <div className="dot" style={{ background: '#555' }}></div>
              </div>
              <div className="viz-content">
                <div className="skeleton-line" style={{ width: '80%' }}></div>
                <div className="skeleton-line" style={{ width: '60%' }}></div>
                <div className="skeleton-line" style={{ width: '90%' }}></div>
                <div className="score-badge">Analysis Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontWeight: 600 }}>Why Choose Our Analyzer?</h2>
          <div className="features-grid">
            <div className="glass-card feature-card">
              <div className="icon">📄</div>
              <h3>Instant Analysis</h3>
              <p>Upload your PDF and get detailed feedback in seconds with our high-performance engine.</p>
            </div>
            <div className="glass-card feature-card">
              <div className="icon">📈</div>
              <h3>Skill Scoring</h3>
              <p>Identify your key strengths and receive a competitive score relative to industry standards.</p>
            </div>
            <div className="glass-card feature-card">
              <div className="icon">🖋️</div>
              <h3>Actionable Tips</h3>
              <p>Receive specific recommendations on how to refine your resume for modern standards.</p>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .home-container {
          overflow-x: hidden;
          background: var(--background);
        }
        .hero {
          padding: 120px 0;
          background: radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.02), transparent),
                      radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.02), transparent);
        }
        .hero .container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          gap: 60px;
        }
        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 600px;
          line-height: 1.8;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
        }
        .hero-visual {
          position: relative;
        }
        .main-viz {
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          border: 1px solid var(--border-subtle);
          background: var(--surface);
        }
        .viz-header {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; opacity: 0.5; }
        .skeleton-line {
          height: 10px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          margin-bottom: 14px;
        }
        .score-badge {
          display: inline-block;
          margin-top: 24px;
          padding: 10px 20px;
          background: var(--primary);
          color: white;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .features-section {
          padding: 100px 0;
          border-top: 1px solid var(--border-subtle);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .feature-card {
          padding: 2.5rem;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          transition: border-color 0.3s ease;
        }
        .feature-card:hover {
          border-color: var(--accent);
        }
        .feature-card .icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          display: block;
        }
        .feature-card h3 {
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        .feature-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        @media (max-width: 968px) {
          .hero .container { grid-template-columns: 1fr; text-align: center; }
          .hero-subtitle { margin: 0 auto 2.5rem; }
          .hero-actions { justify-content: center; }
          .hero-visual { display: none; }
        }
      `}} />
    </div>
  );
};

export default Home;
