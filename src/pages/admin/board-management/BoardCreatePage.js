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
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="pb-2 border-bottom">새 게시판 생성</h2>
                <button onClick={() => navigate('/admin/boards')} className="btn btn-secondary">목록으로 돌아가기</button>
            </div>
            <div className="card my-4">
                <div className="card-body">
                    <form onSubmit={handleCreateBoard}>
                        <div className="mb-3">
                            <label htmlFor="boardTitle" className="form-label">게시판 이름</label>
                            <input type="text" id="boardTitle" name="boardTitle" className="form-control" placeholder="새 게시판 이름" required />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-success">생성하기</button>
                        </div>
                    </form>
                    {error && <div className="form-text text-danger mt-2">{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default BoardCreatePage;