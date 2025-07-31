import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatRooms, createChatRoom } from '../../api/features/chatbot';

function ChatRoomListPage() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

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
            const response = await createChatRoom(title);
            // 새 방 생성 성공 시, 해당 채팅방 페이지로 바로 이동
            navigate(`/chatbot/${response.data.id}`);
        } catch (error) {
            console.error("채팅방 생성 실패:", error);
            alert("채팅방 생성에 실패했습니다.");
        }
    };
    
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
                    <button key={room.id} onClick={() => navigate(`/chatbot/${room.id}`)} className="list-group-item list-group-item-action">
                        {room.title}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChatRoomListPage;