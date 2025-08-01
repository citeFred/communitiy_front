import apiClient from '../api-client';

export const createComment = (boardId, articleId, content, parentCommentId = null) => {
    // --- 디버깅용 alert 추가 ---
    alert(`API 호출 직전내용: ${content} 부모 댓글 ID: ${parentCommentId}`);
    // -------------------------
    const payload = {
        content,
        parentCommentId 
    };
    
    return apiClient.post(`/boards/${boardId}/articles/${articleId}/comments`, payload);
};