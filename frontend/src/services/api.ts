import axios from 'axios';

export const api = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api/',
    baseURL: 'https://twitter-clone-api-3s3p.onrender.com/api/',
});