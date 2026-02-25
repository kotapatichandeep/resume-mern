import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
    config => {
        // Clerk tokens should be set dynamically or passed in headers
        // For now, we expect the token to be set explicitly if needed
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export default api;
