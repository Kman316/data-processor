// src/axiosConfig.js

import axios from 'axios';
import { getCSRFToken } from './utils/csrf';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,  // Include cookies in requests
});

axiosInstance.interceptors.request.use(config => {
    const token = getCSRFToken();
    if (token) {
        config.headers['X-CSRFToken'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
