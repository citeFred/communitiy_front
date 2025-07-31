import apiClient from '../api-client';

export const createComment = (boardId, articleId, content) => {
    return apiClient.post(`/boards/${boardId}/articles/${articleId}/comments`, { content });
};