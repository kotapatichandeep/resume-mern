# AI Resume Analyzer (MERN Stack)

This is a MERN stack application for analyzing resumes using AI.

## Project Structure

- `frontend/`: React + Vite application
- `backend/`: Node.js + Express + MongoDB application

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud URI)

## Environment Variables

**Never commit `.env` files to version control.** Use `.env.example` as a template.

- Backend environment variables: See `backend/.env.example`
- Add your actual `.env` file to `backend/` directory locally

## Setup & Run

### 1. Backend

Navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` by copying `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` and update the values with your actual configuration:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `CLERK_SECRET_KEY`: Your Clerk authentication key (if using Clerk)
- `OPENAI_API_KEY`: Your OpenAI API key for AI resume analysis
- `PORT`: Server port (default: 5000)

Start the backend server:
```bash
node server.js
# or for development with auto-reload
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
