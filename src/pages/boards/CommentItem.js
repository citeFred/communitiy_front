import { useState } from 'react';

function CommentItem({ comment, onReplySubmit }) {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleReplySubmit = (e) => {
        e.preventDefault();

        // --- 디버깅용 alert 추가 ---
        // alert('전달하려는 부모 댓글의 ID: ' + comment.id);
        // -------------------------
        const content = e.target.replyContent.value;
        if (!content) return;

        onReplySubmit(content, comment.id);
        
        setShowReplyForm(false);
        e.target.reset();
    };

    return (
        <div className="p-4 bg-gray-50 border rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <strong className="font-semibold">익명</strong>
                    <p className="text-gray-700 mt-1">{comment.content}</p>
                </div>
                <button 
                    onClick={() => setShowReplyForm(!showReplyForm)}
                    className="text-sm text-blue-500 hover:underline flex-shrink-0 ml-4"
                >
                    답글
                </button>
            </div>

            {showReplyForm && (
                <form onSubmit={handleReplySubmit} className="mt-4">
                    <textarea 
                        name="replyContent" 
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm" 
                        rows="2" 
                        placeholder="대댓글을 입력하세요..."
                        required
                    ></textarea>
                    <div className="text-right mt-2">
                        <button type="submit" className="px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-md">등록</button>
                    </div>
                </form>
            )}

            {comment.childComments && comment.childComments.length > 0 && (
                <div className="mt-4 ml-6 pl-6 space-y-4">
                    {comment.childComments.map(child => (
                        <div key={child.id} className="flex items-start">
                            <span className="mr-3 text-gray-400 text-xl">↳</span>
                            <div className="flex-grow">
                                <CommentItem comment={child} onReplySubmit={onReplySubmit} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentItem;