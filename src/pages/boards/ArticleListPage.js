import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticlesByBoard, createArticle } from '../../api/features/articles';

function ArticleListPage() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');
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

    const handleCreateArticle = async (e) => {
        e.preventDefault();
        setError('');
        const formData = {
            title: e.target.title.value,
            content: e.target.content.value,
            file: e.target.file.files[0]
        };

        try {
            await createArticle(boardId, formData);
            const response = await getArticlesByBoard(boardId);
            setArticles(response.data.content);
        } catch (err) {
            setError('게시글 작성에 실패했습니다.');
            console.error(err);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="pb-2 border-bottom">게시글 목록</h2>
                <button onClick={() => navigate('/boards')} className="btn btn-secondary">게시판 목록으로</button>
            </div>

            <div className="card my-4">
                <div className="card-body">
                    <h5 className="card-title">새 게시글 작성</h5>
                    <form onSubmit={handleCreateArticle}>
                        <div className="mb-3">
                            <input type="text" name="title" className="form-control" placeholder="제목" required />
                        </div>
                        <div className="mb-3">
                            <textarea name="content" className="form-control" rows="3" placeholder="내용" required></textarea>
                        </div>
                        <div className="mb-3">
                            <input type="file" name="file" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">작성하기</button>
                    </form>
                    {error && <div className="form-text text-danger mt-2">{error}</div>}
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