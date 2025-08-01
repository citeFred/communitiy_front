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

    const handleBoardSelect = (board) => {
        navigate(`/boards/${board.id}`, { state: { boardTitle: board.title } });
    };

    return (
        <div>
            <h2 className="pb-2 text-3xl font-bold border-b">게시판 목록</h2>
            <p className="mt-2 text-gray-500">관심 있는 게시판을 선택하여 입장하세요.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {boards.length > 0 ? boards.map(board => (
                    <ActionCard
                        key={board.id}
                        title={board.title}
                        text={`"${board.title}" 게시판입니다.`}
                        buttonText="입장하기"
                        onButtonClick={() => handleBoardSelect(board)}
                    />
                )) : <p className="col-span-full text-center text-gray-500">생성된 게시판이 없습니다.</p>}
            </div>
        </div>
    );
}

export default BoardListPage;