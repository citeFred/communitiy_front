import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticlesByBoard } from '../../api/features/articles';

function ArticleListPage() {
    const [articles, setArticles] = useState([]);
    const { boardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await getArticlesByBoard(boardId);
                setArticles(response.data.content);
            } catch (error) {
                console.error("게시글 목록 조회 실패", error);
            }
        };
        fetchArticles();
    }, [boardId]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="pb-2 border-bottom">게시글 목록</h2>
                <div>
                    <button onClick={() => navigate(`/boards/${boardId}/articles/create`)} className="btn btn-primary me-2">새 글 작성</button>
                    <button onClick={() => navigate('/boards')} className="btn btn-secondary">게시판 목록으로</button>
                </div>
            </div>

            <div className="list-group mt-4">
                {articles.length > 0 ? articles.map(article => (
                     <div key={article.id} onClick={() => navigate(`/boards/${boardId}/articles/${article.id}`)} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}}>
                        <span>{article.title}</span>
                        <small className="text-muted">{article.authorNickname}</small>
                    </div>
                )):  <div className="list-group-item">작성된 게시글이 없습니다.</div>}
            </div>
        </div>
    );
}

export default ArticleListPage;