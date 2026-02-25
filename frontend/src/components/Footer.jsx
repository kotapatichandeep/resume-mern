import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '20px 0',
            textAlign: 'center',
            marginTop: 'auto'
        }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
