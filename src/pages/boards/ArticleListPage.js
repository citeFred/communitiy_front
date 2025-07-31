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
            <div className="flex justify-between items-center pb-2 border-b">
                <h2 className="text-3xl font-bold">게시글 목록</h2>
                <div className="flex gap-2">
                    <button 
                        onClick={() => navigate(`/boards/${boardId}/articles/create`)} 
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        새 글 작성
                    </button>
                    <button 
                        onClick={() => navigate('/boards')} 
                        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                    >
                        게시판 목록으로
                    </button>
                </div>
            </div>

            <div className="mt-6 space-y-2">
                {articles.length > 0 ? articles.map(article => (
                     <div 
                        key={article.id} 
                        onClick={() => navigate(`/boards/${boardId}/articles/${article.id}`)} 
                        className="p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                     >
                        <span className="font-medium text-gray-800">{article.title}</span>
                        <small className="text-gray-500">{article.authorNickname}</small>
                    </div>
                )) :  
                <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
                    작성된 게시글이 없습니다.
                </div>
                }
            </div>
        </div>
    );
}

export default ArticleListPage;