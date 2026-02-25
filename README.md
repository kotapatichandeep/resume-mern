# AI Resume Analyzer (MERN Stack)

This is a MERN stack application for analyzing resumes using AI.

## Project Structure

- `frontend/`: React + Vite application
- `backend/`: Node.js + Express + MongoDB application

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud URI)

## Setup & Run

### 1. Backend

Navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-analyzer
JWT_SECRET=your_secret_key_here
```

Start the backend server:
```bash
node server.js
# or for development
npm run dev
```
Server runs on http://localhost:5000

### 2. Frontend

Navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
Frontend runs on http://localhost:5173

## Features Implemented (Day 1-4)

- **Project Initialization**: Setup React and Node.js environments.
- **UI Wireframing**: Created Home, Login, Register, and Dashboard pages.
- **Database Schema**: Designed User, Resume, and Activity models.
- **Authentication**: JWT-based authentication (Register/Login API).
- **Basic API**: CRUD foundations for Resumes.

## Next Steps (Day 5-15)

- Implement Resume Parsing Logic.
- Build Admin Dashboard.
- Enhance UI with real data.
- Add File Upload functionality.
