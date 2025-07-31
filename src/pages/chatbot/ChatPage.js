import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getChatDialogs, postMessage } from '../../api/features/chatbot';
// import './ChatbotPage.css'; // 더 이상 CSS 파일이 필요 없습니다.

function ChatPage() {
    const [dialogs, setDialogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { roomId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const chatWindowRef = useRef(null);
    const roomTitle = location.state?.title || '채팅';

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
        <div className="flex flex-col" style={{height: 'calc(100vh - 200px)'}}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b flex-shrink-0">
                <h2 className="text-2xl font-bold truncate">{roomTitle}</h2>
                <button 
                    onClick={() => navigate('/chatbot')} 
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    대화방 목록으로
                </button>
            </div>

            <div ref={chatWindowRef} className="flex-grow overflow-y-auto p-4 bg-gray-100 rounded-lg flex flex-col space-y-4">
                {dialogs.map((dialog, index) => (
                    <div 
                        key={index} 
                        className={`max-w-[80%] w-fit p-3 rounded-xl break-words ${
                            dialog.senderType === 'USER' 
                            ? 'bg-blue-500 text-white self-end rounded-br-lg' 
                            : 'bg-white text-gray-800 self-start rounded-bl-lg'
                        }`}
                    >
                        {dialog.content}
                    </div>
                ))}
                {isLoading && <div className="p-3 rounded-xl bg-white text-gray-800 self-start">...</div>}
            </div>

            <form onSubmit={handleSendMessage} className="mt-4 flex-shrink-0">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        name="message" 
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
                        placeholder="메시지를 입력하세요..." 
                        autoComplete="off" 
                        required 
                        disabled={isLoading} 
                    />
                    <button 
                        type="submit" 
                        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-green-300"
                        disabled={isLoading}
                    >
                        전송
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatPage;