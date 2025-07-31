import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChatDialogs, postMessage } from '../../api/features/chatbot';
import './ChatbotPage.css'; // 기존 CSS 재사용

function ChatPage() {
    const [dialogs, setDialogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { roomId } = useParams(); // URL에서 roomId 가져오기
    const navigate = useNavigate();
    const chatWindowRef = useRef(null);

    useEffect(() => {
        const fetchDialogs = async () => {
            setIsLoading(true);
            try {
                const response = await getChatDialogs(roomId);
                setDialogs(response.data);
            } catch (error) {
                console.error("대화 내용 로딩 실패:", error);
                alert("대화 내용을 불러오는 데 실패했습니다.");
                navigate('/chatbot');
            } finally {
                setIsLoading(false);
            }
        };
        fetchDialogs();
    }, [roomId, navigate]);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [dialogs]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const input = e.target.message;
        const message = input.value.trim();
        if (!message) return;

        setDialogs(prev => [...prev, { senderType: 'USER', content: message }]);
        input.value = '';
        setIsLoading(true);

        try {
            const response = await postMessage(roomId, message);
            setDialogs(prev => [...prev, { senderType: 'ASSISTANT', content: response.data.response }]);
        } catch (error) {
            setDialogs(prev => [...prev, { senderType: 'ASSISTANT', content: '오류가 발생했습니다.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="pb-2">채팅</h2>
                <button onClick={() => navigate('/chatbot')} className="btn btn-secondary">대화방 목록으로</button>
            </div>
            <div ref={chatWindowRef} className="chat-window">
                {dialogs.map((dialog, index) => (
                    <div key={index} className={`chat-message ${dialog.senderType === 'USER' ? 'user-message' : 'assistant-message'}`}>
                        {dialog.content}
                    </div>
                ))}
                {isLoading && <div className="chat-message assistant-message">...</div>}
            </div>
            <form onSubmit={handleSendMessage} className="mt-3">
                <div className="input-group">
                    <input type="text" name="message" className="form-control" placeholder="메시지를 입력하세요..." autoComplete="off" required disabled={isLoading} />
                    <button className="btn btn-success" type="submit" disabled={isLoading}>전송</button>
                </div>
            </form>
        </div>
    );
}

export default ChatPage;