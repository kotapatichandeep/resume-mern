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

## Deployment

### Backend Deployment (Node.js/Express)

**Environment Variables needed:**
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secure random string
- `CLERK_SECRET_KEY`: Clerk API secret
- `OPENAI_API_KEY`: OpenAI API key
- `NODE_ENV`: Set to `production`

**Deploy to Heroku/Railway/Render:**
```bash
npm install
npm start
```

### Frontend Deployment (React/Vite)

**Environment Variables needed:**
- `VITE_API_URL`: Backend API URL (e.g., `https://your-backend.herokuapp.com/api`)
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key

**Build & Deploy:**
```bash
npm install
npm run build
# Deploy the dist/ folder to Vercel, Netlify, or any static host
```

### Checklist Before Deploying

- [ ] `.env` files are in `.gitignore` (never commit secrets)
- [ ] `MONGO_URI` points to MongoDB Atlas or production database
- [ ] All API keys are set in environment variables
- [ ] Frontend `VITE_API_URL` points to production backend
- [ ] CORS is properly configured for production domain
- [ ] File uploads folder (`backend/uploads/`) is writable or uses cloud storage
- [ ] Tests pass locally before deploying

### Recommended Platforms

- **Backend:** Heroku, Railway, Render, or DigitalOcean
- **Frontend:** Vercel, Netlify, or GitHub Pages
- **Database:** MongoDB Atlas (free tier available)
- **File Storage:** AWS S3 or Cloudinary (if not using local uploads)
