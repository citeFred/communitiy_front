import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBoard } from '../../../api/features/boards';

function BoardCreatePage() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        setError('');
        const title = e.target.boardTitle.value;
        if (!title) return;

        try {
            await createBoard(title);
            alert('새로운 게시판이 생성되었습니다.');
            navigate('/admin/boards');
        } catch (error) {
            setError('게시판 생성에 실패했습니다. (서버 오류)');
            console.error("게시판 생성 실패", error);
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center pb-2 border-b mb-6">
                <h2 className="text-3xl font-bold">새 게시판 생성</h2>
                <button 
                    onClick={() => navigate('/admin/boards')} 
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                    목록으로 돌아가기
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleCreateBoard}>
                    <div className="mb-4">
                        <label 
                            htmlFor="boardTitle" 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            게시판 이름
                        </label>
                        <input 
                            type="text" 
                            id="boardTitle" 
                            name="boardTitle" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="새 게시판 이름" 
                            required 
                        />
                    </div>
                    <div className="grid">
                        <button 
                            type="submit" 
                            className="w-full px-4 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                        >
                            생성하기
                        </button>
                    </div>
                </form>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
        </div>
    );
}

export default BoardCreatePage;