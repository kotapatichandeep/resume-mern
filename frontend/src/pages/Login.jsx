import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
    return (
        <div className="auth-page">
            <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <SignIn routing="path" path="/login" signUpUrl="/register" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .auth-page {
                    min-height: calc(100vh - 70px);
                    display: flex;
                    align-items: center;
                    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.02), transparent);
                }
            `}} />
        </div>
    );
};

export default Login;

