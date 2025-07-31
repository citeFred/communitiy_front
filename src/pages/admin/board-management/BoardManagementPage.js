import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '../../../api/features/boards';

function BoardManagementPage() {
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await getBoards();
                setBoards(response.data);
            } catch (error) {
                console.error("게시판 목록 조회 실패", error);
            }
        };
        fetchBoards();
    }, []);
    
    return (
        <div>
            <div className="flex justify-between items-center pb-2 border-b">
                <h2 className="text-3xl font-bold">게시판 관리</h2>
                <button 
                    onClick={() => navigate('/admin/boards/create')} 
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                    새 게시판 생성
                </button>
            </div>
            <div className="mt-6 bg-white rounded-lg shadow">
                <ul className="divide-y divide-gray-200">
                    {boards.map(board => (
                        <li key={board.id} className="px-6 py-4 flex items-center justify-between">
                            <span className="text-gray-800 font-medium">{board.title}</span>
                            {/* 추후 수정/삭제 버튼을 여기에 추가할 수 있습니다. */}
                            {/* <div className="space-x-2">
                                <button className="text-sm text-blue-500 hover:underline">수정</button>
                                <button className="text-sm text-red-500 hover:underline">삭제</button>
                            </div> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BoardManagementPage;