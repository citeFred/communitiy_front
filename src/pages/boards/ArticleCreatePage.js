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
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="pb-2 border-bottom">새 게시글 작성</h2>
                <button onClick={() => navigate(`/boards/${boardId}`)} className="btn btn-secondary">작성 취소</button>
            </div>

            <div className="card my-4">
                <div className="card-body">
                    <form onSubmit={handleCreateArticle}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">제목</label>
                            <input type="text" id="title" name="title" className="form-control" placeholder="제목" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">내용</label>
                            <textarea id="content" name="content" className="form-control" rows="10" placeholder="내용" required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">첨부 파일</label>
                            <input type="file" id="file" name="file" className="form-control" />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">등록하기</button>
                        </div>
                    </form>
                    {error && <div className="form-text text-danger mt-2">{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default ArticleCreatePage;