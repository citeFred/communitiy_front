import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createArticle } from '../../api/features/articles';

function ArticleCreatePage() {
    const [error, setError] = useState('');
    const { boardId } = useParams();
    const navigate = useNavigate();

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
            alert('게시글이 성공적으로 등록되었습니다.');
            navigate(`/boards/${boardId}`);
        } catch (err) {
            setError('게시글 작성에 실패했습니다.');
            console.error(err);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center pb-2 border-b mb-6">
                <h2 className="text-3xl font-bold">새 게시글 작성</h2>
                <button 
                    onClick={() => navigate(`/boards/${boardId}`)} 
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                    작성 취소
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleCreateArticle}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">제목</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="제목을 입력하세요" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">내용</label>
                        <textarea 
                            id="content" 
                            name="content" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            rows="10" 
                            placeholder="내용을 입력하세요" 
                            required
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">첨부 파일</label>
                        <input 
                            type="file" 
                            id="file" 
                            name="file" 
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                        />
                    </div>
                    <div className="grid">
                        <button 
                            type="submit" 
                            className="w-full px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                        >
                            등록하기
                        </button>
                    </div>
                </form>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
        </div>
    );
}

export default ArticleCreatePage;