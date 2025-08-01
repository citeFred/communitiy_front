import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail } from '../../api/features/articles';
import { createComment } from '../../api/features/comments';
import CommentSection from './CommentSection';

function ArticleDetailPage() {
    const [article, setArticle] = useState(null);
    const { boardId, articleId } = useParams();
    const navigate = useNavigate();
    
    const nestedComments = useMemo(() => {
        if (!article?.comments) return [];

        const commentMap = new Map();
        const rootComments = [];
        
        article.comments.forEach(comment => {
            commentMap.set(comment.id, { ...comment, childComments: [] });
        });

        article.comments.forEach(comment => {
            if (comment.parentCommentId && commentMap.has(comment.parentCommentId)) {
                commentMap.get(comment.parentCommentId).childComments.push(commentMap.get(comment.id));
            } else {
                rootComments.push(commentMap.get(comment.id));
            }
        });
        
        return rootComments;
    }, [article]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await getArticleDetail(boardId, articleId);
                setArticle(response.data);
            } catch (error) {
                console.error("게시글 상세 조회 실패", error);
                navigate(`/boards/${boardId}`);
            }
        };
        fetchArticle();
    }, [boardId, articleId, navigate]);

    const handleCreateComment = async (content, parentCommentId) => {
        // --- 디버깅용 alert 추가 ---
        // alert(`API 호출 직전내용: ${content}부모 댓글 ID: ${parentCommentId}`);
        // -------------------------
        if (!content) return;
        try {
            await createComment(boardId, articleId, content, parentCommentId);
            const response = await getArticleDetail(boardId, articleId);
            setArticle(response.data);
        } catch (error) {
            console.error("댓글 작성 실패", error);
            alert("댓글 작성에 실패했습니다.");
        }
    };

    if (!article) {
        return <div className="text-center p-10">로딩 중...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-3xl font-bold truncate">{article.title}</h2>
                 <button 
                    onClick={() => navigate(`/boards/${boardId}`)} 
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 flex-shrink-0"
                 >
                    목록으로
                </button>
            </div>
            <div className="text-sm text-gray-500 border-b pb-3 mb-6">
                <strong className="font-semibold text-gray-700">작성자: {article.authorNickname}</strong> | <span>작성일: {new Date(article.createAt).toLocaleString()}</span>
            </div>
            {article.files && article.files.length > 0 && (
                <div className="mb-6 p-4 bg-gray-100 border rounded-lg">
                    <strong className="font-semibold">첨부파일:</strong> {article.files[0].originalFileName}
                </div>
            )}
            <div className="prose max-w-none bg-white p-4 rounded-md">
                <pre className="whitespace-pre-wrap break-words font-sans">{article.content}</pre>
            </div>
            
            <CommentSection 
                comments={nestedComments} 
                onCommentSubmit={handleCreateComment}
            />
        </div>
    );
}

export default ArticleDetailPage;