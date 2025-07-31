import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '../../api/features/boards';
import ActionCard from '../../components/cards/ActionCard';

function BoardListPage() {
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

    const handleBoardSelect = (boardId) => {
        navigate(`/boards/${boardId}`);
    };

    return (
        <div>
            <h2 className="pb-2 border-bottom">게시판 목록</h2>
            <p className="text-muted">관심 있는 게시판을 선택하여 입장하세요.</p>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
                {boards.length > 0 ? boards.map(board => (
                    <ActionCard
                        key={board.id}
                        title={board.title}
                        text={`"${board.title}" 게시판입니다.`}
                        buttonText="입장하기"
                        onButtonClick={() => handleBoardSelect(board.id)}
                    />
                )) : <p>생성된 게시판이 없습니다.</p>}
            </div>
        </div>
    );
}

export default BoardListPage;