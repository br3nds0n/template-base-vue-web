import axios from 'axios';
import { errorHandler } from './erroHandler';

export const axiosJwt = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosJwt.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosJwt.interceptors.response.use(
    (response) => {
        return { success: true, data: response.data };
    },
    (error) => {
        return { success: false, errors: errorHandler(error) };
    }
);
