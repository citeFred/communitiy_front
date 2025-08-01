import CommentItem from './CommentItem';

function CommentSection({ comments, onCommentSubmit }) {

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const content = e.target.commentContent.value;
        if (!content) return;
        onCommentSubmit(content, null);
        e.target.reset();
    };

    const handleReplySubmit = (content, parentCommentId) => {
        onCommentSubmit(content, parentCommentId);
    };
    
    
    return (
        <div>
            <hr className="my-8" />
            <h3 className="text-2xl font-bold mb-4">댓글</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <form onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                        <textarea 
                            name="commentContent" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            rows="3" 
                            placeholder="댓글을 입력하세요..." 
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600">
                        댓글 등록
                    </button>
                </form>
            </div>
            <div className="space-y-4">
                {comments && comments.length > 0 ? comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} onReplySubmit={handleReplySubmit} />
                )) : <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">댓글이 없습니다.</div>}
            </div>
        </div>
    );
}

export default CommentSection;