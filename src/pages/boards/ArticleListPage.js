import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getArticlesByBoard } from '../../api/features/articles';

function ArticleListPage() {
    const [pageData, setPageData] = useState({
        content: [],
        page: {
            totalPages: 0,
            number: 0,
            totalElements: 0,
        },
    });
    const { boardId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const boardTitle = location.state?.boardTitle || '게시글 목록';

    const fetchArticles = async (page = 0) => {
        try {
            const response = await getArticlesByBoard(boardId, page);
            setPageData(response.data);
        } catch (error) {
            console.error("게시글 목록 조회 실패", error);
        }
    };

    useEffect(() => {
        fetchArticles(0);
    }, [boardId]);

    const handlePageChange = (pageNumber) => {
        fetchArticles(pageNumber);
    };

    return (
        <div>
            <div className="flex justify-between items-center pb-2 border-b">
                <h2 className="text-3xl font-bold">{boardTitle}</h2>
                <button 
                    onClick={() => navigate('/boards')} 
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                    게시판 목록으로
                </button>
            </div>

            <div className="mt-6">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-1/12 text-center">번호</th>
                            <th scope="col" className="px-6 py-3 w-7/12">제목</th>
                            <th scope="col" className="px-6 py-3 w-2/12 text-center">작성자</th>
                            <th scope="col" className="px-6 py-3 w-2/12 text-center">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.content.length > 0 ? pageData.content.map((article, index) => (
                            <tr 
                                key={article.id} 
                                onClick={() => navigate(`/boards/${boardId}/articles/${article.id}`)}
                                className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                            >
                                <td className="px-6 py-4 text-center">
                                    {/* pageData.page 객체 내부의 값에 접근하도록 수정 */}
                                    {pageData.page.totalElements - (pageData.page.number * 10) - index}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {article.title}
                                </th>
                                <td className="px-6 py-4 text-center">{article.authorNickname}</td>
                                <td className="px-6 py-4 text-center">{new Date(article.createAt).toLocaleDateString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center py-10">작성된 게시글이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* pageData.page 객체 내부의 값에 접근하도록 수정 */}
            {pageData.page.totalPages > 0 && (
                <div className="flex justify-center items-center mt-6">
                    <nav>
                        <ul className="inline-flex -space-x-px">
                            {Array.from({ length: pageData.page.totalPages }, (_, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => handlePageChange(i)}
                                        className={`px-3 py-2 leading-tight ${
                                            pageData.page.number === i 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-white text-gray-500 hover:bg-gray-100'
                                        } border border-gray-300`}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
            
            <div className="flex justify-end mt-6">
                <button 
                    onClick={() => navigate(`/boards/${boardId}/articles/create`)} 
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                    새 글 작성
                </button>
            </div>
        </div>
    );
}

export default ArticleListPage;