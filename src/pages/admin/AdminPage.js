import { useState, useEffect } from 'react';
import { getBoards, createBoard } from '../../api/features/boards';

function AdminPage() {
    const [boards, setBoards] = useState([]);

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

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        const title = e.target.boardTitle.value;
        if (!title) return;
        try {
            await createBoard(title);
            e.target.reset();
            
            const response = await getBoards();
            setBoards(response.data);

        } catch (error) {
            console.error("게시판 생성 실패", error);
            alert("게시판 생성에 실패했습니다.");
        }
    };
    
    return (
        <div>
            <h2 className="pb-2 border-bottom">관리자 페이지</h2>
            <div className="card my-4">
                <div className="card-body">
                    <h5 className="card-title">새 게시판 생성</h5>
                    <form onSubmit={handleCreateBoard} className="d-flex">
                        <input type="text" name="boardTitle" className="form-control me-2" placeholder="새 게시판 이름" required />
                        <button type="submit" className="btn btn-success text-nowrap">생성</button>
                    </form>
                </div>
            </div>
            <hr />
            <h4>현재 게시판 목록</h4>
            <ul className="list-group">
                {boards.map(board => (
                    <li key={board.id} className="list-group-item">{board.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;