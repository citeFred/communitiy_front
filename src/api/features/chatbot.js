import apiClient from '../api-client';

export const getChatRooms = () => {
    return apiClient.get('/chatbot/rooms');
};

export const createChatRoom = (title) => {
    return apiClient.post('/chatbot/rooms', { title });
};

export const getChatDialogs = (roomId) => {
    return apiClient.get(`/chatbot/rooms/${roomId}/messages`);
};

export const postMessage = (roomId, message) => {
    return apiClient.post(`/chatbot/rooms/${roomId}/messages`, { message });
};