import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <SignedIn>
                    <Link to="/dashboard" className="logo">Resume Analyzer</Link>
                </SignedIn>
                <SignedOut>
                    <Link to="/" className="logo">Resume Analyzer</Link>
                </SignedOut>

                <ul className="nav-links">
                    <SignedIn>
                        <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                        <li><UserButton afterSignOutUrl="/" /></li>
                    </SignedIn>
                    <SignedOut>
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li>
                            <SignInButton mode="modal">
                                <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Login</button>
                            </SignInButton>
                        </li>
                        <li>
                            <SignInButton mode="modal">
                                <button className="btn btn-primary btn-sm" style={{ padding: '0.5rem 1rem' }}>Get Started</button>
                            </SignInButton>
                        </li>
                    </SignedOut>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

