import { useState, useEffect, useRef } from 'react';
import { getChatRooms, createChatRoom, getChatDialogs, postMessage } from '../../api/features/chatbot';
import './ChatbotPage.css';

function ChatbotPage() {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [dialogs, setDialogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [dialogs]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getChatRooms();
                setRooms(response.data);
            } catch (error) {
                console.error("채팅방 목록 로딩 실패:", error);
            }
        };
        fetchRooms();
    }, []);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        const title = e.target.roomTitle.value;
        if (!title) return;
        try {
            // 1. 서버에 새 채팅방 생성을 요청하고, 생성된 방의 정보를 받습니다.
            const response = await createChatRoom(title);
            const newRoom = response.data;
            
            e.target.reset();

            // 2. 전체 방 목록을 다시 불러와서 왼쪽 목록을 갱신합니다.
            const roomsResponse = await getChatRooms();
            setRooms(roomsResponse.data);

            // 3. 방금 생성된 방으로 즉시 입장합니다.
            handleEnterRoom(newRoom);

        } catch (error) {
            console.error("채팅방 생성 실패:", error);
            alert("채팅방 생성에 실패했습니다.");
        }
    };
    
    const handleEnterRoom = async (room) => {
        setCurrentRoom(room);
        setIsLoading(true);
        try {
            const response = await getChatDialogs(room.id);
            setDialogs(response.data);
        } catch (error) {
            console.error("대화 내용 로딩 실패:", error);
            setDialogs([{ senderType: 'ASSISTANT', content: '대화 내용을 불러오는 데 실패했습니다.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const input = e.target.message;
        const message = input.value.trim();
        if (!message) return;

        setDialogs(prevDialogs => [...prevDialogs, { senderType: 'USER', content: message }]);
        input.value = '';
        setIsLoading(true);

        try {
            const response = await postMessage(currentRoom.id, message);
            setDialogs(prevDialogs => [...prevDialogs, { senderType: 'ASSISTANT', content: response.data.response }]);
        } catch (error) {
            console.error("메시지 전송 실패:", error);
            setDialogs(prevDialogs => [...prevDialogs, { senderType: 'ASSISTANT', content: '오류가 발생했습니다.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!currentRoom) {
        return (
            <div>
                <h2 className="pb-2 border-bottom">AI 챗봇</h2>
                <p className="text-muted">새로운 대화를 시작하거나 이전 대화를 선택하세요.</p>
                <div className="card my-4">
                    <div className="card-body">
                        <h5 className="card-title">새 대화 시작</h5>
                        <form onSubmit={handleCreateRoom} className="d-flex">
                            <input type="text" name="roomTitle" className="form-control me-2" placeholder="새 대화방 제목" required />
                            <button type="submit" className="btn btn-primary text-nowrap">생성 및 입장</button>
                        </form>
                    </div>
                </div>
                <hr />
                <h4>이전 대화 목록</h4>
                <div className="list-group">
                    {rooms.map(room => (
                        <button key={room.id} onClick={() => handleEnterRoom(room)} className="list-group-item list-group-item-action">
                            {room.title}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="pb-2">{currentRoom.title}</h2>
                <button onClick={() => setCurrentRoom(null)} className="btn btn-secondary">대화방 목록으로</button>
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

export default ChatbotPage;