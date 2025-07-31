import apiClient from '../api-client';

export const login = (username, password) => {
    return apiClient.post('/auth/login', { username, password });
};

export const signup = (userData) => {
    return apiClient.post('/auth/signup', userData);
};