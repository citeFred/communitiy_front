import apiClient from '../api-client';

export const getBoards = () => {
    return apiClient.get('/boards');
};

export const createBoard = (title) => {
    return apiClient.post('/boards', { title });
};