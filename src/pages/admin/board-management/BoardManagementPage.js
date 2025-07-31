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
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="pb-2 border-bottom">게시판 관리</h2>
                {/* '새 게시판 생성' 페이지로 이동하는 버튼 추가 */}
                <button onClick={() => navigate('/admin/boards/create')} className="btn btn-primary">새 게시판 생성</button>
            </div>
            <div className="list-group mt-4">
                {boards.map(board => (
                    <div key={board.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {board.title}
                        {/* 추후 수정/삭제 버튼을 여기에 추가할 수 있습니다. */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BoardManagementPage;