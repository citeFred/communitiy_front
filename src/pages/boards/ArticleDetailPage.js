import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail } from '../../api/features/articles';
import { createComment } from '../../api/features/comments';

function ArticleDetailPage() {
    const [article, setArticle] = useState(null);
    const { boardId, articleId } = useParams();
    const navigate = useNavigate();
    
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

    const handleCreateComment = async (e) => {
        e.preventDefault();
        const content = e.target.commentContent.value;
        if (!content) return;
        try {
            await createComment(boardId, articleId, content);
            e.target.reset();
            
            const response = await getArticleDetail(boardId, articleId);
            setArticle(response.data);

        } catch (error) {
            console.error("댓글 작성 실패", error);
            alert("댓글 작성에 실패했습니다.");
        }
    };

    if (!article) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                 <h2 className="pb-2">{article.title}</h2>
                 <button onClick={() => navigate(`/boards/${boardId}`)} className="btn btn-secondary">게시글 목록으로</button>
            </div>
            <div className="text-muted border-bottom pb-2 mb-3">
                <strong>작성자: {article.authorNickname}</strong> | <span>작성일: {new Date(article.createAt).toLocaleString()}</span>
            </div>
            {article.files && article.files.length > 0 && (
                <div className="mb-3">
                    <strong>첨부파일:</strong> {article.files[0].originalFileName}
                </div>
            )}
            <pre className="bg-light p-3 rounded">{article.content}</pre>
            <hr />
            <h3>댓글</h3>
            <div className="card my-4">
                <div className="card-body">
                    <form onSubmit={handleCreateComment}>
                        <div className="mb-3">
                            <textarea name="commentContent" className="form-control" rows="3" placeholder="댓글을 입력하세요..." required></textarea>
                        </div>
                        <button type="submit" className="btn btn-info">댓글 등록</button>
                    </form>
                </div>
            </div>
            <ul className="list-group">
                {article.comments && article.comments.length > 0 ? article.comments.map(comment => (
                    <li key={comment.id} className="list-group-item">
                        <strong>익명:</strong> {comment.content}
                    </li>
                )) : <li className="list-group-item">댓글이 없습니다.</li>}
            </ul>
        </div>
    );
}

export default ArticleDetailPage;